import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getSupabaseAdmin } from "@/lib/supabase";

export const alt = "Bug Invasion - Git City";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Personalized social card for a player who fought the boss event.
// Resolves the player's stats for the MOST RECENT boss event and renders
// a 1200x630 card. Data is read server-side (service role); the URL only
// carries the username, so stats can't be spoofed via query params.
export default async function Image({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const login = decodeURIComponent(username).toLowerCase().replace(/^@/, "");

  const fontData = await readFile(
    join(process.cwd(), "public/fonts/Silkscreen-Regular.ttf"),
  );
  const fonts = [
    { name: "Silkscreen", data: fontData, style: "normal" as const, weight: 400 as const },
  ];

  const bg = "#0d0d0f";
  const cream = "#e8dcc8";
  const muted = "#8c8c9c";
  const cardBg = "#161618";
  const lime = "#c8e64a";

  const supabase = getSupabaseAdmin();

  // Most recent boss event.
  const { data: ev } = await supabase
    .from("event_instances")
    .select("id, theme_config")
    .eq("kind", "boss_raid")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const theme = (ev?.theme_config ?? {}) as { boss_name?: string; color?: string };
  const bossName = (theme.boss_name || "Original Bug").replace(/^the\s+/i, "").toUpperCase();
  const accent = typeof theme.color === "string" && /^#[0-9a-f]{6}$/i.test(theme.color) ? theme.color : lime;

  // Resolve the player + their participation.
  const { data: dev } = await supabase
    .from("developers")
    .select("id, github_login, avatar_url")
    .eq("github_login", login)
    .maybeSingle();

  let damage = 0;
  let minions = 0;
  let rank = 0;
  let total = 0;
  let fought = false;

  if (ev && dev) {
    const { data: part } = await supabase
      .from("event_participations")
      .select("damage_dealt, minions_killed")
      .eq("event_id", ev.id)
      .eq("developer_id", dev.id)
      .maybeSingle();

    if (part && (part.damage_dealt ?? 0) > 0) {
      fought = true;
      damage = part.damage_dealt ?? 0;
      minions = part.minions_killed ?? 0;

      const [{ count: ahead }, { count: all }] = await Promise.all([
        supabase
          .from("event_participations")
          .select("*", { count: "exact", head: true })
          .eq("event_id", ev.id)
          .gt("damage_dealt", damage),
        supabase
          .from("event_participations")
          .select("*", { count: "exact", head: true })
          .eq("event_id", ev.id)
          .gt("damage_dealt", 0),
      ]);
      rank = (ahead ?? 0) + 1;
      total = all ?? 1;
    }
  }

  const avatar = dev?.avatar_url ?? null;
  const handle = (dev?.github_login ?? login).slice(0, 18);

  const statBox = (label: string, value: string) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 250,
        height: 130,
        backgroundColor: bg,
        border: `2px solid #2a2a30`,
      }}
    >
      <div style={{ display: "flex", fontSize: 18, color: muted, letterSpacing: 3 }}>{label}</div>
      <div style={{ display: "flex", fontSize: 52, color: accent, marginTop: 10 }}>{value}</div>
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bg,
          fontFamily: "Silkscreen",
          border: `6px solid ${accent}`,
          padding: 48,
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", fontSize: 22, color: muted, letterSpacing: 8 }}>
          {fought ? "BUG INVASION  ·  DEFEATED" : "BUG INVASION  ·  GIT CITY"}
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 14 }}>
          <div style={{ display: "flex", fontSize: 64, color: cream }}>
            {fought ? "I HELPED DEFEAT" : "DEFEAT THE"}
          </div>
          <div style={{ display: "flex", fontSize: 72, color: accent, marginTop: 4 }}>
            THE {bossName}
          </div>
        </div>

        {/* Player */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
          {avatar ? (
            <img src={avatar} alt="" width={64} height={64} style={{ border: `3px solid ${accent}` }} />
          ) : (
            <div style={{ display: "flex", width: 64, height: 64, backgroundColor: cardBg, border: `3px solid ${accent}` }} />
          )}
          <div style={{ display: "flex", fontSize: 30, color: cream, marginLeft: 18, textTransform: "uppercase" }}>
            {handle}
          </div>
        </div>

        {/* Stats */}
        {fought ? (
          <div style={{ display: "flex", gap: 28, marginTop: 30 }}>
            {statBox("DAMAGE", damage.toLocaleString("en-US"))}
            {statBox("RANK", `#${rank}/${total}`)}
            {statBox("MINIONS", minions.toLocaleString("en-US"))}
          </div>
        ) : (
          <div style={{ display: "flex", fontSize: 24, color: muted, marginTop: 34, letterSpacing: 2 }}>
            JOIN THE NEXT INVASION
          </div>
        )}

        {/* Footer */}
        <div style={{ display: "flex", fontSize: 22, color: accent, marginTop: 36, letterSpacing: 4 }}>
          THEGITCITY.COM
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
