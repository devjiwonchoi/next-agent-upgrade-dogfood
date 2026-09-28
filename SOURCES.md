# Dogfood source snapshots

Each `apps/` directory is copied from the listed public source commit. Upgrade branches start from this baseline; findings remain on `main`.

| App | Source | Commit | Next.js app path |
| --- | --- | --- | --- |
| giscus | `giscus/giscus` | `3d6430237108ca4ee3eb6a1a20595201c09c72d5` | `apps/giscus` |
| OpenResume | `xitanggg/open-resume` | `4f8255a2c763479837f69f1dccf2a3338730cd79` | `apps/open-resume` |
| Open Assistant | `LAION-AI/Open-Assistant` | `f1e6ed9526f5817531f3ab85441a40b3671ddccb` | `apps/open-assistant/website` |
| Homarr | `ajnart/homarr` | `c5873c6e481144cd18a70139ef23ac04ca8ab158` | `apps/homarr` |
| NextChat | `ChatGPTNextWeb/NextChat` | `defdcdb55d850cd12c4c657eb83729fd66e215c0` | `apps/nextchat` |
| AI PDF Chatbot | `mayooear/ai-pdf-chatbot-langchain` | `4b2647c41992a50b72ff6befb9a0bd71461e3dbe` | `apps/ai-pdf-chatbot/frontend` |
| Glass | `pickle-com/glass` | `71bc3dce7c92c31ffd0e68eb708f55b171f52a96` | `apps/glass/pickleglass_web` |
| Papermark | `papermark/papermark` | `ed19717ec02a1ac79aecf5569159aa9d2d869312` | `apps/papermark` |
| Cal.com | `calcom/cal.diy` | `54343aa685ae8f33159d2f485ec4a57bad5c574a` | `apps/cal-diy/apps/web` |
| Novel | `steven-tey/novel` | `fa95098e66476c466faebb8211baa5869c101a9c` | `apps/novel/apps/web` |
| React.dev | `reactjs/react.dev` | `44b0b5f10b7f6477bf146d26444717fb4930439f` | `apps/react-dev` |
| Invoify | `al1abb/invoify` | `3859b3cbae28ca4ec559db5ef87e41b798740340` | `apps/invoify` |
| Overreacted | `gaearon/overreacted.io` | `28b60689a69b11892bad7c4456edb9c63868ce0b` | `apps/overreacted` |
| OpenStock | `Open-Dev-Society/OpenStock` | `0248d5d9284b8b9fae4ae82a211d30fe4b88fe09` | `apps/openstock` |
| Dub | `dubinc/dub` | `21c57aed421d9cb5726bc078242f2bc996414c78` | `apps/dub/apps/web` |
| CodePilot | `op7418/CodePilot` | `1ae6d76de6993377dab961eacf04927babd99eb1` | `apps/codepilot/apps/site` |
| Multica | `multica-ai/multica` | `67d61a2073bad0fbb7140fd2000f1ab7ec0a4f25` | `apps/multica/apps/docs` |
| Linkwarden | `linkwarden/linkwarden` | `952ac4540657cae3a67c3ca59433899d2fda8374` | `apps/linkwarden/apps/web` |
| Supabase Studio | `supabase/supabase` | `db63b4d6a2959ae5bbcea838260afb8817f5f90b` | `apps/supabase/apps/studio` |
| NotionNext | `notionnext-org/NotionNext` | `50e77e069ec48ebd3d641888c13cd5ec6842c3d2` | `apps/notionnext` |
| Onlook | `onlook-dev/onlook` | `423e2e924366419e418ee049093872d535eea41a` | `apps/onlook/apps/web/client` |
| prompts.chat | `f/prompts.chat` | `f78a1c5136fa080155d928e0d7e2b4a41ddef03e` | `apps/prompts-chat` |
| chat-js | `franciscomoretti/chat-js` | `1b1bdd00de24abf700ad21f0d7225c1e2b904f87` | `apps/chat-js/apps/site` |
| Midday | `midday-ai/midday` | `51587319f26a0ffaa9dfccab1920373cb65689b7` | `apps/midday/apps/dashboard` |
| Workout.cool | `Snouzy/workout-cool` | `3e65987f4f11bb86483ff9dfc82b831b9a94cb6d` | `apps/workout-cool` |
| Git City | `srizzon/git-city` | `2b93a5c8f7b8b452463b6da3dd70941b800d4783` | `apps/git-city` |
| Tailwind CSS website | `tailwindlabs/tailwindcss.com` | `7f92c2213315c195dae583d68752da4042da3ade` | `apps/tailwindcss-website` |
| Morphic | `miurla/morphic` | `25d572a110c3c12831d85d26b048b2cd2f6bd22c` | `apps/morphic` |
| Typebot | `baptisteArno/typebot.io` | `3f2870121bf5aa6e8d189cedacfa8c0d20d6774f` | `apps/typebot/apps/builder` |
| TypeHero | `typehero/typehero` | `7871629e9a77718312e68a367644ce3fc286ef04` | `apps/typehero/apps/web` |

Glass includes its pinned `aec` submodule contents at `9e11f4f95707714464194bdfc9db0222ec5c6163`. These are source snapshots, not upstream Git histories.

Overreacted has no repository license file; the dogfood repository owner confirmed redistribution permission for this snapshot.
Tailwind CSS website has no repository license file; the dogfood repository owner confirmed redistribution permission for this snapshot.
The Supabase snapshot omits `apps/ui-library/.env` and `examples/product-sample-supabase-kt/local.properties`; they are local configuration files outside the selected Studio app.
Onlook's `apps/admin` submodule is not included; the selected Next.js app is in `apps/web/client`.
