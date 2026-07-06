# Shahmeer Ali — Portfolio

Personal portfolio (React + Create React App), live at
[portfolio-shahmmeerali.vercel.app](https://portfolio-shahmmeerali.vercel.app/).
Dark-first design with cyan accents, motion-rich but dependency-light: every
animation is hand-rolled CSS/rAF — no GSAP/Framer Motion in the bundle.

## Scripts

```bash
npm start          # dev server on :3000
npm run build      # production build into build/
npx serve -s build # serve the production build locally
```

## Where content lives

All content is plain data arrays at the top of each component — edit them,
no markup changes needed:

| Content            | File                            | What to edit                       |
| ------------------ | ------------------------------- | ---------------------------------- |
| Roles (typewriter) | `src/components/Hero.js`        | `ROLES` array                      |
| Bio + highlights   | `src/components/About.js`       | `highlights` array, paragraphs     |
| Jobs               | `src/components/Experience.js`  | `timeline` array (incl. `tech`)    |
| Projects           | `src/components/Projects.js`    | `projects` array (`category` must match `CATEGORIES`; `featured: true` shows the star) |
| Skills             | `src/components/Skill.js`       | `skillGroups` array                |
| Contact channels   | `src/components/Contact.js`     | `channels` array, `EMAIL` constant |
| Theme colors       | `src/index.css`                 | CSS variables in `:root` (dark) and `body.light` |
| Résumé PDF         | `public/Shahmeer_CV.pdf`        | replace the file                   |

Tech-pill colors on project cards come from `TECH_HUES` in `Projects.js`
(lowercased tech name → HSL hue). Unlisted techs fall back to the cyan pill.
Each project's preview strip shows a mock prompt from `CATEGORY_META`;
set `cmd` on an individual project to override it (e.g. `cmd: 'npx next dev'`).

## Animation system

Everything respects `prefers-reduced-motion` (static fallbacks, no autoplay)
and is disabled on touch devices where it doesn't make sense.

- **Scroll reveals** — `src/hooks/useReveal.js` adds `.visible` to `.reveal`
  elements via IntersectionObserver (`reveal-left/right/scale` variants,
  `--reveal-delay` for stagger). Styles in `src/index.css`.
- **Custom cursor** — `src/components/Cursor.js`. Cyan dot + lerped trailing
  ring; ring fills white with `mix-blend-mode: difference` over interactive
  elements. Fine pointers only. Remove `<Cursor />` from `App.js` to disable.
- **Magnetic buttons** — `src/hooks/useMagnetic.js`, delegated on `.btn`.
  Tune pull with the `strength`/`max` args in `App.js`.
- **Scroll-velocity skew** — `src/hooks/useScrollSkew.js` tilts containers
  marked `data-skew` up to 1° with scroll speed. Delete the attribute on a
  container to opt it out.
- **Hero** — name uses a scramble/decode effect, role uses a typewriter
  (first word holds ~4.5s so it reads complete), portrait has morphing
  gradient blobs + opposite-direction mouse parallax (`useParallax`).
- **Skills terminal** — `Skill.js` types `cat skills.txt` when scrolled into
  view, then prints groups staggered.
- **Contact constellation** — `src/components/Constellation.js`, canvas
  particle network; pauses offscreen via IntersectionObserver.
- **Count-up stat** — `src/hooks/useCountUp.js` (projects counter).
- **Section numbers** — the big outlined `01…05` come from `data-num` on each
  `<section>` (styled in `index.css`).

Motion tokens (durations/easings) are CSS variables in `index.css` —
`--dur-fast/med/slow`, `--ease-out/in-out` — change them there to retime the
whole site.

## Contact form

Posts through EmailJS (`@emailjs/browser`) with the service/template/public
keys in `Contact.js`. Fields: `user_name`, `user_email`, `subject`, `message`.
Don't submit the form while testing — it sends real email.
