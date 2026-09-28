import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase";

interface Params {
  params: Promise<{ username: string }>;
}

function cleanLogin(raw: string): string {
  return decodeURIComponent(raw).toLowerCase().replace(/^@/, "");
}

async function loadStats(login: string) {
  const supabase = getSupabaseAdmin();
  const { data: ev } = await supabase
    .from("event_instances")
    .select("id, theme_config")
    .eq("kind", "boss_raid")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const theme = (ev?.theme_config ?? {}) as { boss_name?: string };
  const bossName = theme.boss_name || "Original Bug";

  const { data: dev } = await supabase
    .from("developers")
    .select("id, github_login, avatar_url")
    .eq("github_login", login)
    .maybeSingle();

  if (!ev || !dev) return { bossName, dev: dev ?? null, fought: false, damage: 0, minions: 0, rank: 0, total: 0 };

  const { data: part } = await supabase
    .from("event_participations")
    .select("damage_dealt, minions_killed")
    .eq("event_id", ev.id)
    .eq("developer_id", dev.id)
    .maybeSingle();

  if (!part || (part.damage_dealt ?? 0) <= 0) {
    return { bossName, dev, fought: false, damage: 0, minions: 0, rank: 0, total: 0 };
  }

  const damage = part.damage_dealt ?? 0;
  const [{ count: ahead }, { count: all }] = await Promise.all([
    supabase.from("event_participations").select("*", { count: "exact", head: true }).eq("event_id", ev.id).gt("damage_dealt", damage),
    supabase.from("event_participations").select("*", { count: "exact", head: true }).eq("event_id", ev.id).gt("damage_dealt", 0),
  ]);

  return { bossName, dev, fought: true, damage, minions: part.minions_killed ?? 0, rank: (ahead ?? 0) + 1, total: all ?? 1 };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const login = cleanLogin((await params).username);
  const s = await loadStats(login);
  const handle = s.dev?.github_login ?? login;

  const title = s.fought
    ? `${handle} helped defeat ${s.bossName} — Git City`
    : `Bug Invasion — Git City`;
  const description = s.fought
    ? `Dealt ${s.damage.toLocaleString("en-US")} damage, ranked #${s.rank}/${s.total} in the Git City Bug Invasion. Build your own 3D city from your GitHub.`
    : `Join the Bug Invasion in Git City — a 3D pixel city built from real GitHub data.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BossSharePage({ params }: Params) {
  const login = cleanLogin((await params).username);
  const s = await loadStats(login);
  const handle = s.dev?.github_login ?? login;
  const bossUpper = s.bossName.replace(/^the\s+/i, "").toUpperCase();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 py-16 font-pixel uppercase text-cream">
      <div className="w-full max-w-xl border-2 border-border bg-bg-raised p-8" style={{ boxShadow: "6px 6px 0 0 #2a2a30" }}>
        <p className="text-center text-[10px] tracking-[0.3em] text-muted">
          {s.fought ? "Bug Invasion · Defeated" : "Bug Invasion · Git City"}
        </p>

        <h1 className="mt-4 text-center text-2xl leading-tight text-lime">
          {s.fought ? <>I HELPED DEFEAT<br />THE {bossUpper}</> : <>DEFEAT THE<br />{bossUpper}</>}
        </h1>

        <div className="mt-6 flex items-center justify-center gap-3">
          {s.dev?.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.dev.avatar_url} alt="" width={48} height={48} className="border-2 border-lime" />
          ) : (
            <div className="h-12 w-12 border-2 border-lime bg-bg-card" />
          )}
          <span className="text-base text-cream">{handle}</span>
        </div>

        {s.fought && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["Damage", s.damage.toLocaleString("en-US")],
              ["Rank", `#${s.rank}/${s.total}`],
              ["Minions", s.minions.toLocaleString("en-US")],
            ].map(([label, value]) => (
              <div key={label} className="border border-border bg-bg p-3 text-center">
                <p className="text-[9px] tracking-widest text-muted">{label}</p>
                <p className="mt-1 text-lg text-lime">{value}</p>
              </div>
            ))}
          </div>
        )}

        <a
          href="/"
          className="btn-press mt-8 block bg-lime px-4 py-3 text-center text-[11px] tracking-widest text-bg"
          style={{ boxShadow: "4px 4px 0 0 #2a2a30" }}
        >
          Build your own city →
        </a>
        <p className="mt-3 text-center text-[9px] tracking-wider text-cream/40 normal-case">
          thegitcity.com — your GitHub as a 3D city
        </p>
      </div>
    </main>
  );
}
