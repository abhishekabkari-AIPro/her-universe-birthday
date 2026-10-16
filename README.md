# HER Universe — Birthday Website V1

A Japanese-minimalist, romantic, mobile-first birthday website for Shruthi.

## Files

- `index.html` — page structure and your editable personal text
- `style.css` — visual design and responsive styling
- `script.js` — birthday countdown, puzzle, letter interaction and scroll effects
- `media/` — place your local media here

## First things to edit

Open `script.js` and change:

```js
birthdayDateJapan: "2026-10-19"
```

to Shruthi's actual birthday date. V1 is currently configured for 19 October 2026.

The V1 puzzle is already configured as:

```js
puzzleQuestion: "What is our marriage date?"
puzzleAnswer: "20th august 2021"
```

The checker accepts common variations such as `20 August 2021` and `20th August 2021`.

## Add your media

Recommended files:

- `media/childhood-01.jpg`
- `media/childhood-02.jpg`
- `media/childhood-03.jpg`
- `media/memory-01.jpg`
- `media/memory-02.jpg`
- `media/memory-03.jpg`
- `media/birthday-song.mp3`
- `media/birthday-film.mp4`

V1 currently displays safe placeholders. After you are comfortable with the structure, replace placeholder blocks in `index.html` with `<img>` and `<video>` elements.

## Important privacy note

GitHub Pages is public hosting. Do not place private/intimate photographs, personal recordings, or sensitive information in a public GitHub repository.

For V1, use placeholders or non-sensitive assets. Keep private media on a separate controlled host and link/embed it only after you have verified the host's privacy/access settings.

## Local testing

Open `index.html` in a browser.

For the best experience, use a simple local server from the project folder:

Python:
`python -m http.server 8000`

Then open:
`http://localhost:8000`

## GitHub Pages deployment

1. Create a GitHub account if needed.
2. Create a new repository, e.g. `her-universe`.
3. Upload `index.html`, `style.css`, `script.js`, and the non-sensitive project files.
4. Push/commit the files.
5. Open repository **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Choose your main branch and `/ (root)`.
8. Save.
9. GitHub will provide the Pages URL after deployment.
10. Open the URL on your phone and test the entire flow.

If your repository is public, assume anything in it can be viewed/downloaded.

## Before the real birthday

Test:
- puzzle on Android and desktop
- countdown against Japan time
- all navigation links
- audio/video loading
- mobile portrait layout
- letter opening
- slow internet behavior
- private media permissions
- backup copies of all original media



## Step 9 — wedding and family blessing photos

Added three supplied photos to `media/`: `our-beginning.jpg`, `our-close-moment.jpg`, and `family-blessings.jpg`. The gallery uses responsive layouts and keeps the full image visible rather than cropping it. The family caption remembers Shruthi's father with love and respect.

Privacy reminder: any images included in a public GitHub Pages repository can be viewed by others. Confirm you are comfortable sharing these family photographs publicly before publishing.


## Step 10 — distance and shared-life memories

Added a seven-photo chapter using all seven images from the latest upload batch. The gallery includes Japan/travel, a research milestone, outdoor memories, family, city lights, and quiet everyday moments. Captions avoid claiming any image is an airport goodbye because that was not confirmed. All photos use `object-fit: contain` and automatic image height to avoid cropping.

New media files: `japan-castle-memory.jpg`, `shruthi-research-milestone.jpg`, `our-green-escape.jpg`, `family-at-home.jpg`, `city-lights-together.jpg`, `quiet-together.jpg`, and `our-outdoor-memory.jpg`.

## Step 11 — The chicken lover & her terrace
- Added the original terrace photo (`media/shobha-chicken-terrace.jpg`) in a warm printed-photo frame with the full image preserved.
- Added the personal memory about Shruthi, her sister Shobha's homemade chicken kebabs, and the peace of the old terrace.
- Added a tap-to-play, original ambient nostalgia soundscape generated in-browser with Web Audio. It does not autoplay and can be paused at any time; no external music file is required.
- Replaced remaining generic placeholders in the “memories that became us” timeline with finished, grounded copy.


### Step 14 — Appa’s plant and quiet care
Added the original photo `media/appa-plant-memory.jpg` with a personal story about Appa’s thoughtful care, his worry until everyone reached home safely, and how we often understand those small acts more deeply when we miss them.


## Step 16 — Dino's birthday video

Added the original video `media/dino-birthday-wish.mp4` to the dedicated “A birthday wish from your best friend” chapter. The video uses native controls, does not autoplay, and retains its original audio.

**Privacy reminder:** if this site is deployed in a public GitHub repository, this video and all included photos may be viewable/downloadable by others. Use private/controlled hosting if you want to restrict access.

### Cartoon surprise image credits / notes
The transition uses externally hosted character PNGs for a personal, non-commercial birthday page. They require an internet connection when opened locally. Snoopy dancing image: RealClipart (personal-use listing, https://www.realclipart.com/middle/m2i8Z5d3Z5A0A0K9_snoopy-dancing-png-picture-dance/). Pluto PNG: PNGimg (CC BY-NC 4.0 listing, https://pngimg.com/image/64298). Popeye PNG: Wikimedia Commons file listing (https://commons.wikimedia.org/wiki/File:Popeye_transparent.png). Please review source terms before publishing the page publicly.

After the marriage-date answer, the surprise runs a spoken 10-to-1 countdown with ticking beeps, then a comic-style boom, full-screen sparkles and a short soft flute-like birthday phrase before the main site appears.


### Step 25 — Pluto image fallback, baby-style countdown, longer birthday reveal
- Corrected Pluto's PNG filename and added a second image URL fallback if the first one fails. The cartoon still requires an internet connection.
- Updated the spoken 10-to-1 countdown to use a slower, higher-pitched, playful childlike voice, preferring an available English female/child voice where the browser provides one. Actual voice quality depends on the device's installed speech voices.
- Kept the “HAPPY BIRTHDAY, SHRUTHI!” blast visible for at least five seconds before the main site transition.

### Step 26 updates
- Replaced the unreliable remote Pluto image with a bundled original cute dancing puppy illustration (`media/cute-dancing-puppy.png`), so it displays offline. The character is labeled “PLUTO'S PUPPY” rather than implying the illustration is official Pluto artwork.
- Replaced browser speech synthesis with bundled, consistent high-pitched playful counting clips (`media/count-1.wav` through `media/count-10.wav`). This prevents the overlapping adult/child voices caused by device-dependent browser TTS. The clips are synthetic voice effects, not a recording of a real baby.
