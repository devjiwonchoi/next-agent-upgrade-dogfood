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

Glass includes its pinned `aec` submodule contents at `9e11f4f95707714464194bdfc9db0222ec5c6163`. These are source snapshots, not upstream Git histories.
