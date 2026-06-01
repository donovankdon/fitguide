import type { WardrobeItem, ItemCategory, Palette } from "../lib/wardrobe";
import { SLOT_FOR_CATEGORY } from "../lib/wardrobe";

/** Generated from the wardrobe-research workflow (current 2026 pieces in Don's palette + size). */
type RawItem = {
  id: string; brand: string; model: string; category: ItemCategory; colors: Palette[];
  styleTags: string[]; trend?: string; size: string; fitNote?: string; price?: number; buyUrl?: string; why?: string;
};

const RAW = ([
  {
    "id": "uniqlo-pleated-wide-pants-tall-available",
    "brand": "Uniqlo",
    "model": "Pleated Wide Pants (Tall available)",
    "category": "trouser",
    "colors": [
      "black",
      "olive",
      "stone"
    ],
    "styleTags": [
      "pleated",
      "wide-leg",
      "relaxed",
      "elastic-waist",
      "two-way-stretch"
    ],
    "size": "XL regular, or Tall XL (E462429) for his 6'1\" + 32\" inseam — Tall version exists and is th…",
    "why": "The single best entry point into the pleated/wide-leg trend for the money.",
    "trend": "2026 pleated + wide/relaxed trouser trend — the accessible version of…",
    "fitNote": "Elastic/2-way-stretch waist forgives a muscular waist-to-thigh; wide straight leg flatters quads/glutes.",
    "price": 50,
    "buyUrl": "https://www.uniqlo.com/us/en/products/E462197-000/00"
  },
  {
    "id": "uniqlo-pleated-wide-pants-tall-e462429",
    "brand": "Uniqlo",
    "model": "Pleated Wide Pants — Tall (E462429)",
    "category": "trouser",
    "colors": [
      "black",
      "olive",
      "stone"
    ],
    "styleTags": [
      "pleated",
      "wide-leg",
      "tall-fit",
      "relaxed",
      "elastic-waist"
    ],
    "size": "Tall XL — this is the explicit Tall make of the pleated wide pant, engineered with extra r…",
    "why": "Same elevated-casual pleated wide silhouette as above but cut Tall, so the leg keeps its full drape all the way to the shoe instead of hitting high on the ankle on a 6'1\" frame.",
    "trend": "2026 pleated wide trouser — tall-friendly execution",
    "fitNote": "Tall block adds rise and inseam — key for not looking like he's wearing cropped pants. Wide straight leg balances a 225 lb upper body. True to size.",
    "price": 50,
    "buyUrl": "https://www.uniqlo.com/us/en/products/E462429-000/00"
  },
  {
    "id": "abercrombie-fitch-pleated-baggy-trouser-cotton",
    "brand": "Abercrombie & Fitch",
    "model": "Pleated Baggy Trouser (cotton poplin)",
    "category": "trouser",
    "colors": [
      "black",
      "white",
      "cream"
    ],
    "styleTags": [
      "pleated",
      "baggy",
      "wide-leg",
      "heritage",
      "cotton-poplin"
    ],
    "size": "38 x 32 — true numeric sizing (waist 28-38, inseams 28/30/32/34), so he gets his exact 38x…",
    "why": "Numeric-waist pleated baggy trouser that hits his exact 38x32 — rare in the trend space.",
    "trend": "2026 pleated/baggy trouser trend — Abercrombie's Trend Edit",
    "fitNote": "Baggy-through-leg cut is built for room — flatters thighs/seat. Pick the 32 inseam (not shorter) so it doesn't read cropped on 6'1\".",
    "price": 95,
    "buyUrl": "https://www.abercrombie.com/shop/us/p/pleated-baggy-trouser-62973819"
  },
  {
    "id": "j-crew-giant-fit-chino-pant",
    "brand": "J.Crew",
    "model": "Giant-fit Chino Pant",
    "category": "trouser",
    "colors": [
      "stone",
      "black",
      "olive",
      "blue"
    ],
    "styleTags": [
      "wide",
      "relaxed",
      "flat-front",
      "heritage",
      "cotton-twill"
    ],
    "size": "38 waist — full numeric run including 38; 8.5oz cotton twill, sewn cuff, longer rise.",
    "why": "The widest, roomiest chino J.Crew makes — a '90s-revival relaxed silhouette that scratches the 'current + relaxed' itch without going full pleated.",
    "trend": "2026 relaxed/wide chino revival (heritage-leaning, not strictly pleate…",
    "fitNote": "Explicitly 'very spacious through hip and thigh' with a longer rise — the most athletic-friendly cut of the bunch.",
    "price": 98,
    "buyUrl": "https://www.jcrew.com/p/mens/categories/clothing/pants-and-chinos/chino/giant-fit-chino-pant/BI521"
  },
  {
    "id": "dickies-original-874-work-pant",
    "brand": "Dickies",
    "model": "Original 874 Work Pant",
    "category": "utility",
    "colors": [
      "olive",
      "black",
      "stone",
      "brown"
    ],
    "styleTags": [
      "utility",
      "straight-leg",
      "heritage",
      "workwear",
      "twill"
    ],
    "size": "38 x 32 — waist run 28-58, so 38 is easy and he can get a clean 32 inseam.",
    "why": "The utility-adjacent workwear anchor of the capsule and the budget hero. Khaki (stone), Olive Green, Black, Dark Brown all live in his palette.",
    "trend": "Timeless workwear staple (riding the broader 2026 workwear/utility wav…",
    "fitNote": "Classic/relaxed straight cut with roomy seat and high rise suits an athletic build; they run a touch big in the waist, so a true 38 is right.",
    "price": 30,
    "buyUrl": "https://www.dickies.com/en-us/products/original-874-r-work-pants-dk0008740db"
  },
  {
    "id": "buck-mason-hollywood-pleated-trouser-cotton-li",
    "brand": "Buck Mason",
    "model": "Hollywood Pleated Trouser (cotton-linen twill)",
    "category": "trouser",
    "colors": [
      "stone",
      "cream",
      "black"
    ],
    "styleTags": [
      "pleated",
      "high-rise",
      "full-leg",
      "vintage",
      "cotton-linen"
    ],
    "size": "38 — numeric waist run to 38 (28-38). High rise, full top block, full leg.",
    "why": "The elevated heritage pick — a vintage-inspired double-pleat trouser in cotton-linen twill that reads dressy-but-easy and breathes for Florida.",
    "trend": "2026 pleated relaxed-tailoring trend, executed heritage/elevated",
    "fitNote": "High rise + full top block + full leg = built for a fuller lower body; the pleats open over the thigh rather than straining.",
    "price": 228,
    "buyUrl": "https://www.buckmason.com/products/classic-khaki-hollywood-pleated-trouser"
  },
  {
    "id": "todd-snyder-relaxed-fit-japanese-selvedge-chin",
    "brand": "Todd Snyder",
    "model": "Relaxed Fit Japanese Selvedge Chino (or pleate…",
    "category": "trouser",
    "colors": [
      "olive",
      "stone"
    ],
    "styleTags": [
      "relaxed",
      "selvedge",
      "heritage",
      "100%-cotton",
      "vintage-military"
    ],
    "size": "38 waist — verify 38 in his exact colorway at checkout (range typically runs to 38).",
    "why": "Top-tier splurge and the most 'designer' read in his palette.",
    "trend": "2026 elevated heritage / relaxed-tailoring — investment tier",
    "fitNote": "Relaxed fit with a fuller leg suits the athletic build; selvedge cotton is sturdy and drapes after break-in.",
    "price": 298,
    "buyUrl": "https://www.toddsnyder.com/products/relaxed-fit-selvedge-chinoolive"
  },
  {
    "id": "uniqlo-u-crew-neck-short-sleeve-t-shirt-christ",
    "brand": "Uniqlo",
    "model": "U Crew Neck Short-Sleeve T-Shirt (Christophe L…",
    "category": "tee",
    "colors": [
      "white",
      "black",
      "olive",
      "cream",
      "blue",
      "brown"
    ],
    "styleTags": [
      "heavyweight",
      "boxy",
      "loose-fit",
      "heritage",
      "unisex"
    ],
    "size": "XL (goes up to XXL). Loose unisex cut already runs roomy with a slightly longer body; XL g…",
    "why": "The single best value-to-quality tee in the game and the backbone of his capsule. Compact heavyweight dry-touch jersey, vintage-military bound neckline, loose boxy cut.",
    "trend": "timeless (Lemaire-designed heritage basic; the loose cut is also right…",
    "fitNote": "Loose cut skims an athletic chest/shoulders instead of clinging. On a 225lb build size XL; size down to L only if you want it more fitted.",
    "price": 20,
    "buyUrl": "https://www.uniqlo.com/us/en/products/E433028-000/00"
  },
  {
    "id": "abercrombie-fitch-premium-heavyweight-2-0-tee",
    "brand": "Abercrombie & Fitch",
    "model": "Premium Heavyweight 2.0 Tee",
    "category": "tee",
    "colors": [
      "white",
      "black",
      "cream",
      "blue",
      "brown",
      "olive"
    ],
    "styleTags": [
      "heavyweight",
      "275gsm",
      "boxy",
      "relaxed",
      "tall-friendly"
    ],
    "size": "XL Tall. This is the standout: it ships in BOTH Regular and Tall lengths via a Length sele…",
    "why": "Hits the brief almost exactly: genuine heavyweight 275gsm softAF fabric, oversized/relaxed boxy silhouette, AND real Tall sizing for a 6'1\" guy.",
    "trend": "timeless base, current relaxed-fit execution (the boxy 275g cut is squ…",
    "fitNote": "Tall length is the whole point for his frame; keeps a heavyweight boxy tee from riding up over an athletic torso.",
    "price": 40,
    "buyUrl": "https://www.abercrombie.com/shop/us/p/premium-heavyweight-20-tee-58965824"
  },
  {
    "id": "buck-mason-slub-curved-hem-tee",
    "brand": "Buck Mason",
    "model": "Slub Curved Hem Tee",
    "category": "tee",
    "colors": [
      "white",
      "black",
      "olive",
      "cream",
      "blue"
    ],
    "styleTags": [
      "slub",
      "curved-hem",
      "textured",
      "heritage",
      "made-in-USA"
    ],
    "size": "XL. Buck Mason runs slim-to-regular, so XL for a 225lb athletic build.",
    "why": "His already-liked brand. The Slub (145gsm textured cotton, knit at their own Mohnton PA mill) reads more elevated and broken-in than a flat jersey, with a curved hem that's quietly heritage.…",
    "trend": "timeless (modern American heritage staple)",
    "fitNote": "Note: this is lighter weight (145gsm), so it's the breathable Florida option rather than the structured heavyweight.",
    "price": 48,
    "buyUrl": "https://www.buckmason.com/products/black-slub-curved-hem-tee"
  },
  {
    "id": "arket-heavyweight-t-shirt-220-gsm-270-gsm-over",
    "brand": "ARKET",
    "model": "Heavyweight T-Shirt (220 GSM) / 270 GSM Oversi…",
    "category": "tee",
    "colors": [
      "white",
      "black",
      "olive",
      "cream",
      "blue",
      "stone"
    ],
    "styleTags": [
      "heavyweight",
      "220gsm",
      "270gsm",
      "relaxed",
      "boxy"
    ],
    "size": "L-XL. The 220gsm Heavyweight is a relaxed fit (size L for a not-too-baggy boxy look, XL fo…",
    "why": "Already a brand he likes. Open-end 16Ne yarn gives a coarse vintage hand that ages well, relaxed cut, and a wide neutral palette (white/black/olive/stone/blue).",
    "trend": "current (heavyweight + relaxed/oversized is the 2026 tee silhouette)",
    "fitNote": "Go 270 Oversized for the drape that flatters big shoulders without clinging. The sturdy fabric holds shape on an athletic chest.",
    "price": 45,
    "buyUrl": "https://www.arket.com/en-us/product/heavy-weight-t-shirt-white-1248995002/"
  },
  {
    "id": "cos-oversized-heavyweight-cotton-t-shirt-290-g",
    "brand": "COS",
    "model": "Oversized Heavyweight Cotton T-Shirt (290 GSM…",
    "category": "tee",
    "colors": [
      "white",
      "black",
      "blue",
      "grey",
      "cream"
    ],
    "styleTags": [
      "heavyweight",
      "290gsm",
      "boxy",
      "oversized",
      "structured"
    ],
    "size": "L-XL. True structured 290gsm with a boxy oversized silhouette, so L reads boxy-but-clean o…",
    "why": "His existing brand and the heaviest, most structured tee on this list at 290gsm.",
    "trend": "current (the structured boxy heavyweight is peak 2026 minimal-menswear…",
    "fitNote": "Best-in-class for an athletic build: 290gsm holds its shape so it skims rather than stretches across the chest.",
    "price": 59,
    "buyUrl": "https://www.cos.com/en-us/men/menswear/tshirts/oversized-fit/product/the-heavy-duty-t-shirt-white-1147848001"
  },
  {
    "id": "wax-london-dean-boxy-relaxed-t-shirt-textured-",
    "brand": "Wax London",
    "model": "Dean Boxy Relaxed T-Shirt (Textured 280gsm Org…",
    "category": "tee",
    "colors": [
      "white",
      "cream",
      "black",
      "blue",
      "brown",
      "olive"
    ],
    "styleTags": [
      "heavyweight",
      "280gsm",
      "textured",
      "boxy",
      "organic-cotton"
    ],
    "size": "XL. Runs as a boxy/relaxed cut; model wears M, so a 225lb athletic build takes XL (goes to…",
    "why": "His already-liked elevated brand. The Dean is textured 280gsm organic cotton with a genuinely premium hand and a boxy relaxed cut, the most 'designed' tee in his rotation.",
    "trend": "current (boxy textured heavyweight is the elevated-casual move for 202…",
    "fitNote": "Boxy relaxed cut is built for drape, not for hugging a gym frame, exactly what he wants.",
    "price": 78,
    "buyUrl": "https://huckberry.com/store/wax-london/category/p/87592-dean-boxy-t-shirt"
  },
  {
    "id": "lady-white-co-rugby-t-shirt-custom-10oz-310gsm",
    "brand": "Lady White Co.",
    "model": "Rugby T-Shirt (custom 10oz / ~310gsm jersey)",
    "category": "tee",
    "colors": [
      "white",
      "cream",
      "black",
      "stone",
      "grey"
    ],
    "styleTags": [
      "heavyweight",
      "10oz",
      "boxy",
      "made-in-USA",
      "structured"
    ],
    "size": "L-XL (\"your size\" once tried, sizes run boxy/true).",
    "why": "The splurge / hero tee. 10oz jersey is the heaviest and most luxurious on this list, boxy by design, in muted earth neutrals (White, Off White, Paper, Pewter, Black Mushroom, Black) that sit…",
    "trend": "timeless (cult heavyweight made-in-USA staple; the boxy heft is also b…",
    "fitNote": "The 10oz weight gives real structure so it stands off an athletic torso and reads expensive, not tight. Boxy cut suits broad shoulders.",
    "price": 150,
    "buyUrl": "https://ladywhiteco.com/products/rugby-t-shirt-white"
  },
  {
    "id": "flint-and-tinder-classic-linen-shirt-long-slee",
    "brand": "Flint and Tinder",
    "model": "Classic Linen Shirt (long sleeve, button-down…",
    "category": "button-up",
    "colors": [
      "white",
      "blue",
      "olive",
      "stone"
    ],
    "styleTags": [
      "linen",
      "heritage",
      "lightweight 4.5oz",
      "everyday"
    ],
    "size": "XL. Cut closer to a true regular fit, so for a broad 6'1\" 225 frame go XL for room through…",
    "why": "The workhorse heritage linen shirt in your exact palette (white/blue/olive/tan). Oxford-style silhouette with a soft linen hand reads elevated-casual, not beachy.",
    "trend": "timeless",
    "fitNote": "Athletic builds report it can pull slightly at the chest in M/L, so size up to XL. Roll the sleeves to avoid a fitted forearm look.",
    "price": 128,
    "buyUrl": "https://huckberry.com/store/flint-and-tinder/category/p/91184-classic-linen-shirt"
  },
  {
    "id": "flint-and-tinder-open-weave-camp-collar-shirt-",
    "brand": "Flint and Tinder",
    "model": "Open Weave Camp Collar Shirt (short sleeve)",
    "category": "button-up",
    "colors": [
      "white",
      "cream",
      "olive",
      "blue",
      "stone"
    ],
    "styleTags": [
      "camp-collar",
      "linen",
      "open-weave",
      "breathable",
      "Florida-friendly"
    ],
    "size": "XL. Camp collars run boxier/relaxed by design, which suits the frame; XL gives the slightl…",
    "why": "The textbook Florida elevated-casual short-sleeve: breezy open weave, relaxed camp collar, neutral palette.",
    "trend": "Camp/Cuban collar remains a strong 2026 summer staple; the relaxed ope…",
    "fitNote": "Boxy by design so true-to-size XL works; the relaxed cut is exactly what you want vs. a slim resort shirt. Wear open over a white/cream heavy tee.",
    "price": 98,
    "buyUrl": "https://huckberry.com/store/flint-and-tinder/category/p/91052-open-weave-camp-collar-shirt"
  },
  {
    "id": "buck-mason-japanese-chambray-station-shirt-l04",
    "brand": "Buck Mason",
    "model": "Japanese Chambray Station Shirt (L046)",
    "category": "button-up",
    "colors": [
      "blue",
      "white"
    ],
    "styleTags": [
      "chambray",
      "heritage",
      "workwear",
      "5oz Japanese indigo",
      "fades like denim"
    ],
    "size": "XL. Buck Mason runs trim-classic (their 6'0\"/180 model wears M), so for 6'1\" 225 go XL for…",
    "why": "Your chambray pillar done right: 5oz Japanese indigo yarn-dyed chambray with two chest pockets and run-off side gussets, garment-washed so it fades like denim over time.",
    "trend": "timeless",
    "fitNote": "Buck Mason cuts lean; do not size to your normal L. XL keeps the chambray from straining across the chest.",
    "price": 138,
    "buyUrl": "https://www.buckmason.com/products/l046-japanese-chambray-station-shirt"
  },
  {
    "id": "buck-mason-crosshatch-linen-camp-shirt-short-s",
    "brand": "Buck Mason",
    "model": "Crosshatch Linen Camp Shirt (short sleeve, e.g…",
    "category": "button-up",
    "colors": [
      "cream",
      "stone",
      "olive",
      "white"
    ],
    "styleTags": [
      "camp-collar",
      "linen",
      "boxy",
      "cropped body",
      "elevated"
    ],
    "size": "L or XL. This one is intentionally oversized/boxy with a cropped body, so it runs large —…",
    "why": "The most current-feeling camp shirt of the group: 100% linen crosshatch weave, deliberately boxy and slightly cropped — exactly the relaxed-drape direction you're pushing for.",
    "trend": "Boxy/cropped relaxed camp shirt is squarely on the 2026 relaxed-tailor…",
    "fitNote": "Boxy + cropped means a big frame fills it well at L; only go XL if the L body length feels too short for your torso.",
    "price": 145,
    "buyUrl": "https://www.buckmason.com/collections/camp-shirting"
  },
  {
    "id": "j-crew-baird-mcnutt-irish-linen-camp-collar-sh",
    "brand": "J.Crew",
    "model": "Baird McNutt Irish Linen Camp-Collar Shirt (lo…",
    "category": "button-up",
    "colors": [
      "white",
      "blue",
      "olive",
      "stone",
      "black"
    ],
    "styleTags": [
      "camp-collar",
      "Irish linen",
      "garment-dyed",
      "elevated",
      "heritage"
    ],
    "size": "XL. Regular fit and reviewers note it runs slightly large, so XL gives a relaxed (not slim…",
    "why": "Best mid-tier camp collar: premium Baird McNutt Irish linen (the gold standard) in a long-sleeve camp/loop collar, garment-dyed for rich muted tones that sit perfectly in your palette.",
    "trend": "Camp/loop collar in premium linen is a current 2026 staple",
    "fitNote": "Runs slightly large in a regular fit, so XL drapes relaxed without being baggy.",
    "price": 110,
    "buyUrl": "https://www.jcrew.com/p/mens/categories/clothing/shirts/linen/baird-mcnutt-irish-linen-camp-collar-shirt/CF668"
  },
  {
    "id": "cos-relaxed-camp-collar-linen-shirt-short-slee",
    "brand": "COS",
    "model": "Relaxed Camp-Collar Linen Shirt (short sleeve)",
    "category": "button-up",
    "colors": [
      "white",
      "blue",
      "cream",
      "black",
      "olive"
    ],
    "styleTags": [
      "camp-collar",
      "linen",
      "relaxed",
      "boxy",
      "minimal"
    ],
    "size": "L or XL. COS cuts intentionally relaxed/boxy and the European sizing runs a bit slimmer in…",
    "why": "The most minimal-elevated of the set: 70% linen / 30% recycled linen, clean relaxed camp collar with COS's signature architectural drape.",
    "trend": "Squarely on the 2026 relaxed/boxy minimalist tailoring trend",
    "fitNote": "COS shoulders run slimmer than US brands; size up to XL so the relaxed body doesn't read tight up top.",
    "price": 99,
    "buyUrl": "https://www.cos.com/en-us/men/linen-collection"
  },
  {
    "id": "abercrombie-fitch-athletic-straight-jean",
    "brand": "Abercrombie & Fitch",
    "model": "Athletic Straight Jean",
    "category": "jean",
    "colors": [
      "blue",
      "stone"
    ],
    "styleTags": [
      "straight",
      "athletic-fit",
      "stretch",
      "relaxed"
    ],
    "size": "38 x 32 (waist 28-40, inseam 28/30/32/34 — gets your true 38x32).",
    "why": "This is the single best thigh/seat-friendly straight jean for your build — cut explicitly with 'more room through the thigh and seat' plus a touch of stretch, so it drapes straight instead o…",
    "trend": "timeless (the relaxed-straight + athletic-room cut is also riding the…",
    "fitNote": "Built FOR your frame. Extra room thigh + seat, tapered-straight leg, mid-high rise kills waist gap.",
    "price": 80,
    "buyUrl": "https://www.abercrombie.com/shop/us/p/athletic-straight-jeans-50635343"
  },
  {
    "id": "levi-s-559-relaxed-straight-fit",
    "brand": "Levi's",
    "model": "559 Relaxed Straight Fit",
    "category": "jean",
    "colors": [
      "blue",
      "black"
    ],
    "styleTags": [
      "relaxed",
      "straight",
      "heritage",
      "roomy-thigh"
    ],
    "size": "38 x 32 (Levi's stocks 38W across 30/32/34 inseam).",
    "why": "The athletic-build sleeper hit — reviewers with muscular thighs repeatedly call it 'a dream pair.' Relaxed through hip and thigh, then a clean straight leg, with a slightly lower modern rise…",
    "trend": "timeless heritage (relaxed-straight is the safe edge of the 2026 roomy…",
    "fitNote": "Roomy thigh + straight leg is the natural fit for a quad-heavy 38. Less tapered than 541 — go this route if the 541 ever feels tight below the knee.",
    "price": 70,
    "buyUrl": "https://www.levi.com/US/en_US/clothing/men/jeans/relaxed/559-relaxed-straight-fit-mens-jeans/p/005590247"
  },
  {
    "id": "levi-s-541-athletic-taper",
    "brand": "Levi's",
    "model": "541 Athletic Taper",
    "category": "jean",
    "colors": [
      "blue",
      "black"
    ],
    "styleTags": [
      "athletic-taper",
      "stretch",
      "straight",
      "heritage"
    ],
    "size": "38 x 32 (38W in 30/32/34 inseam). Levi's Flex stretch denim — true to size for a 38 athlet…",
    "why": "The classic 'I lift but want to look put-together' jean: extra room in thigh and seat, then a gentle taper from knee to ankle so it stays sharp over a boot or low sneaker.",
    "trend": "timeless (athletic-taper is counter to the wide trend but reads sharp…",
    "fitNote": "Purpose-built for muscular builds. Roomy seat/thigh + taper = flatters big legs without going baggy. The taper is the one caveat vs.",
    "price": 70,
    "buyUrl": "https://www.levi.com/US/en_US/clothing/men/jeans/taper/541TM-athletic-taper-fit-mens-jeans/p/181810792"
  },
  {
    "id": "uniqlo-wide-straight-jeans-tall-available",
    "brand": "Uniqlo",
    "model": "Wide Straight Jeans (Tall available)",
    "category": "jean",
    "colors": [
      "blue",
      "black"
    ],
    "styleTags": [
      "wide-straight",
      "relaxed",
      "heavyweight",
      "retro"
    ],
    "size": "Waist 38 (runs 27-40). Get the TALL version (separate listing) for added inseam — ideal fo…",
    "why": "This is your on-ramp to the 2026 wide/relaxed trend at $50.",
    "trend": "2026 wide-leg / relaxed-denim trend — the affordable entry point",
    "fitNote": "Wide-straight means the thigh is never the limiting factor — fit the waist and the leg has room to spare. Best modern-silhouette pick here.",
    "price": 50,
    "buyUrl": "https://www.uniqlo.com/us/en/products/E473319-000/00"
  },
  {
    "id": "flint-and-tinder-365-pant-hb-straight-military",
    "brand": "Flint and Tinder",
    "model": "365 Pant (HB Straight) — Military Olive",
    "category": "trouser",
    "colors": [
      "olive",
      "stone",
      "black",
      "blue"
    ],
    "styleTags": [
      "straight",
      "utility",
      "stretch",
      "heritage",
      "military-chino"
    ],
    "size": "Waist 38 (runs 28-38), inseam 30/32/34 — your 38x32 lands clean.",
    "why": "Your elevated olive utility pant — this is the upgrade from the Dickies for when you want heritage-casual, not workwear.",
    "trend": "timeless military-heritage (olive utility is perennially on for your a…",
    "fitNote": "Straight (not slim) cut gives the thigh room; the slight stretch handles the rest. Sits at the true waist.",
    "price": 98,
    "buyUrl": "https://huckberry.com/store/flint-and-tinder/category/p/58172-365-pant-straight"
  },
  {
    "id": "dickies-original-874-work-pant-olive-green",
    "brand": "Dickies",
    "model": "Original 874 Work Pant — Olive Green",
    "category": "trouser",
    "colors": [
      "olive",
      "black",
      "stone"
    ],
    "styleTags": [
      "relaxed",
      "straight",
      "utility",
      "heritage",
      "workwear"
    ],
    "size": "Waist 38 x 30 or 32 inseam (874 comes in 38W across multiple lengths; widely stocked).",
    "why": "The cheap, bombproof olive utility staple — relaxed fit, high rise, straight leg with a slight taper that leaves real room in seat and thigh.",
    "trend": "timeless (the 874 is a permanent heritage-workwear fixture)",
    "fitNote": "Relaxed fit + roomy seat/thigh make it forgiving on big legs; non-stretch twill so size the waist accurately (they run roomy — a true 38 fits, no need…",
    "price": 40,
    "buyUrl": "https://www.dickies.com/en-us/products/original-874-r-work-pants-dk000874hrc"
  },
  {
    "id": "thursday-boot-company-captain-brown-leather-ca",
    "brand": "Thursday Boot Company",
    "model": "Captain (Brown Leather, cap-toe lace-up boot)",
    "category": "boot",
    "colors": [
      "brown"
    ],
    "styleTags": [
      "heritage",
      "Goodyear-welt",
      "cap-toe",
      "leather",
      "workwear"
    ],
    "size": "Shoe size unknown — order YOUR size. Thursday runs true-to-size for medium feet; if you're…",
    "why": "The exact boot he already owns and likes, in his core brown. Cap-toe lace-up is the workhorse of heritage-casual — anchors a heavyweight tee + relaxed/pleated trouser without going dressy.",
    "trend": "timeless — but the chunkier welted boot under relaxed trousers is squa…",
    "fitNote": "Sturdy welted sole and slightly heavier silhouette balances a big frame — won't look dainty under wide/pleated pants the way a slim dress boot would.",
    "price": 199,
    "buyUrl": "https://thursdayboots.com/products/mens-brown-captain"
  },
  {
    "id": "thursday-boot-company-captain-heritage-rustic-",
    "brand": "Thursday Boot Company",
    "model": "Captain Heritage (Rustic Brown / Mustang Brown…",
    "category": "boot",
    "colors": [
      "brown"
    ],
    "styleTags": [
      "heritage",
      "pull-up-leather",
      "Goodyear-welt",
      "cap-toe",
      "rugged"
    ],
    "size": "Order YOUR size, same as standard Captain (true-to-size; size down a half if between or or…",
    "why": "Step-up version of the Captain in hand-finished pull-up leather that scuffs in beautifully — more character, more depth of brown.",
    "trend": "timeless — pull-up/oiled leathers are having a heritage moment in 2026",
    "fitNote": "Same robust last as the Captain — proportioned to look right with a relaxed leg break.",
    "price": 235,
    "buyUrl": "https://thursdayboots.com/products/mens-heritage-captain-lace-up-boot-rustic-brown"
  },
  {
    "id": "thursday-boot-company-scout-chukka-cognac-moch",
    "brand": "Thursday Boot Company",
    "model": "Scout Chukka (Cognac / Mocha / Cinnamon Suede)",
    "category": "chukka",
    "colors": [
      "brown",
      "stone"
    ],
    "styleTags": [
      "suede",
      "chukka",
      "Goodyear-welt",
      "heritage",
      "studio-sole"
    ],
    "size": "Order YOUR size (TTS; size down a half if between).",
    "why": "His suede-chukka slot, but on a welted, more substantial last than a Clarks — bridges casual and elevated.",
    "trend": "timeless heritage; suede chukkas are a 2026 relaxed-tailoring staple",
    "fitNote": "Welted construction and a slightly chunkier profile keep it from looking spindly under wide-leg pants — a real concern with thin-soled suede boots on…",
    "price": 199,
    "buyUrl": "https://thursdayboots.com/products/mens-cognac-suede-scout"
  },
  {
    "id": "clarks-originals-desert-boot-sand-suede",
    "brand": "Clarks Originals",
    "model": "Desert Boot (Sand Suede)",
    "category": "chukka",
    "colors": [
      "stone"
    ],
    "styleTags": [
      "suede",
      "desert-boot",
      "crepe-sole",
      "heritage",
      "lightweight"
    ],
    "size": "Order YOUR size — Clarks Originals run roomy/long; if between sizes, size DOWN a half.",
    "why": "The original sand-suede desert boot he already likes — the lightest, most Florida-appropriate boot here.",
    "trend": "timeless icon",
    "fitNote": "Crepe sole is light, so it reads more casual than dressy — best with cropped/straight relaxed pants rather than full wide-leg, where a thicker sole ho…",
    "price": 140,
    "buyUrl": "https://www.clarks.com/en-us/desert-boot/26155527-p"
  },
  {
    "id": "cariuma-oca-low-premium-leather",
    "brand": "Cariuma",
    "model": "OCA Low Premium Leather",
    "category": "sneaker",
    "colors": [
      "white",
      "black",
      "stone"
    ],
    "styleTags": [
      "leather",
      "low-profile",
      "clean-minimal",
      "gum-sole-option",
      "comfort"
    ],
    "size": "Order YOUR size — Cariuma OCA runs true-to-size; if between, size down a half (no half-siz…",
    "why": "His clean low leather sneaker slot, upgraded from canvas to LWG-certified premium pebbled leather so it holds shape and looks intentional, not gym.",
    "trend": "timeless minimal sneaker; clean leather low-tops remain the default el…",
    "fitNote": "Low, slim-but-not-skinny profile — keeps the foot from looking heavy. Reads elevated-casual under both relaxed jeans and pleated trousers.",
    "price": 159,
    "buyUrl": "https://www.cariuma.com/collections/oca-low-leather-men"
  },
  {
    "id": "oliver-cabell-low-1-white-full-grain-italian-l",
    "brand": "Oliver Cabell",
    "model": "Low 1 (White full-grain Italian leather)",
    "category": "sneaker",
    "colors": [
      "white",
      "black",
      "cream",
      "brown"
    ],
    "styleTags": [
      "full-grain-Italian-leather",
      "minimal",
      "low-profile",
      "elevated",
      "made-in-Italy"
    ],
    "size": "Order YOUR size — Low 1 runs true-to-size; if between sizes, size up a half (leather is fi…",
    "why": "The premium-tier clean white leather sneaker — full-grain Italian leather and a refined low profile that out-classes a typical white sneaker.",
    "trend": "riding the 2026 quiet-luxury / elevated-minimal sneaker trend",
    "fitNote": "Sleek but structured upper photographs clean on a larger build without looking bulky; the low stance keeps proportions long.",
    "price": 180,
    "buyUrl": "https://olivercabell.com/products/low-1-white-mens"
  },
  {
    "id": "birkenstock-arizona-suede-leather-taupe-sandca",
    "brand": "Birkenstock",
    "model": "Arizona (Suede Leather, Taupe / Sandcastle)",
    "category": "sandal",
    "colors": [
      "stone",
      "brown"
    ],
    "styleTags": [
      "suede",
      "two-strap",
      "cork-footbed",
      "heritage",
      "Florida-staple"
    ],
    "size": "Birkenstock uses EU sizing — order by your EU size, NOT a US guess.",
    "why": "The Florida-essential. Taupe/Sandcastle suede sits perfectly in his stone/cream/brown palette and reads elevated-casual, not beach.",
    "trend": "riding the 2026 'ugly-comfort'/heritage-sandal trend that's gone fully…",
    "fitNote": "Substantial cork footbed and wide two-strap profile suit a bigger foot and frame far better than a thin slide; molds to the foot over time for all-day…",
    "price": 140,
    "buyUrl": "https://www.birkenstock.com/us/arizona-suede-leather-taupe/arizona-core-suedeleather-0-eva-u_46.html"
  },
  {
    "id": "taylor-stitch-the-ojai-jacket-chore-coat-organ",
    "brand": "Taylor Stitch",
    "model": "The Ojai Jacket (Chore Coat) — Organic Smoked…",
    "category": "overshirt",
    "colors": [
      "olive",
      "black"
    ],
    "styleTags": [
      "heritage",
      "chore coat",
      "relaxed",
      "8oz organic cotton twill",
      "French workwear"
    ],
    "size": "XL (44). Size range XS(36)–XXL(46); model is 6'1\" in a Medium and it fits true to size, so…",
    "why": "This is the elevate-an-outfit piece. Smoked olive lands dead-center in his palette, the French chore silhouette is the heritage-workwear backbone of his capsule, and 8oz organic twill is lig…",
    "trend": "Riding the 2026 relaxed-workwear / unstructured-chore-as-blazer trend…",
    "fitNote": "Chore coats are cut roomy by design; XL clears a 6'1\"/225 chest and lets you layer a heavyweight tee underneath. Sleeves run generous.",
    "price": 198,
    "buyUrl": "https://www.taylorstitch.com/products/ojai-jacket-in-organic-smoked-olive-foundation-twill-2307"
  },
  {
    "id": "flint-and-tinder-classic-chore-coat-huckberry",
    "brand": "Flint and Tinder",
    "model": "Classic Chore Coat (Huckberry)",
    "category": "overshirt",
    "colors": [
      "olive",
      "brown",
      "black"
    ],
    "styleTags": [
      "heritage",
      "chore coat",
      "relaxed",
      "8.3oz cotton twill",
      "garment-washed"
    ],
    "size": "XL. Runs up to XXL — if he wants the deliberately-oversized 2026 drape, size up to XXL; fo…",
    "why": "The workhorse. Military Olive and Earth (brown) both sit in his palette, the 2% stretch + garment-wash means it moves and looks broken-in day one (good for a big athletic frame), and at $178…",
    "trend": "Timeless core piece, but Earth/brown chore coats are having a 2026 mom…",
    "fitNote": "The 2% spandex is the tell — it gives across the back and shoulders where most chore coats bind on athletic builds.",
    "price": 178,
    "buyUrl": "https://huckberry.com/store/flint-and-tinder/category/p/97467-classic-chore-coat"
  },
  {
    "id": "buck-mason-craftsman-canvas-field-jacket-field",
    "brand": "Buck Mason",
    "model": "Craftsman Canvas Field Jacket — Field Olive",
    "category": "utility",
    "colors": [
      "olive",
      "brown"
    ],
    "styleTags": [
      "heritage",
      "field jacket",
      "7.5oz sueded cotton canvas",
      "corduroy collar",
      "relaxed"
    ],
    "size": "L or XL. Buck Mason's classic fit has room in the torso with a slightly slimmer arm — size…",
    "why": "A field jacket flavor to vary the silhouette from a pure chore coat — corduroy collar + sueded canvas reads rugged-but-refined, which is exactly his elevated-casual lane.",
    "trend": "Field/utility jackets are trending 2026 alongside the chore-coat wave;…",
    "fitNote": "Buck Mason runs trim in the arm relative to the torso — for an athletic build go XL so the sleeves/shoulders aren't tight.",
    "price": 188,
    "buyUrl": "https://www.buckmason.com/products/field-olive-craftsman-canvas-field-jacket"
  },
  {
    "id": "taylor-stitch-the-hbt-jacket-washed-olive-herr",
    "brand": "Taylor Stitch",
    "model": "The HBT Jacket — Washed Olive (herringbone ove…",
    "category": "overshirt",
    "colors": [
      "olive",
      "blue"
    ],
    "styleTags": [
      "heritage",
      "military overshirt",
      "8.5oz organic cotton",
      "herringbone",
      "relaxed"
    ],
    "size": "XL (44). Same size logic as the Ojai — XS(36)–XXL(46), TTS, 6'1\" model wears M; XL for ath…",
    "why": "The lightest layer of the set — a true overshirt that splits the difference between shirt and jacket, ideal for FL when a chore coat is too much.",
    "trend": "HBT/herringbone military overshirts are a 2026 heritage-revival staple…",
    "fitNote": "Overshirt cut is naturally relaxed/boxy — flatters the relaxed-drape direction he's chasing.",
    "price": 198,
    "buyUrl": "https://www.taylorstitch.com/products/hbt-jacket-in-washed-olive"
  },
  {
    "id": "taylor-stitch-the-ball-cap-olive-6-panel",
    "brand": "Taylor Stitch",
    "model": "The Ball Cap — Olive (6-panel)",
    "category": "cap",
    "colors": [
      "olive",
      "black",
      "blue"
    ],
    "styleTags": [
      "heritage",
      "6-panel",
      "hemp/organic cotton blend",
      "leather strap-back",
      "antique brass buckle"
    ],
    "size": "Your size — adjustable leather strap-back with antique brass buckle, one-size-fits-most (t…",
    "why": "A clean structured 6-panel in olive that ties straight to the olive layers and his existing olive/cream/black cap rotation.",
    "trend": "Timeless. Structured heritage ball caps with leather strap-backs are t…",
    "fitNote": "Leather strap-back is the move for a bigger head/athletic frame — more adjustment range than a plastic snap, and it ages well.",
    "price": 48,
    "buyUrl": "https://www.taylorstitch.com/products/ball-cap-in-olive"
  },
  {
    "id": "buck-mason-craftsman-canvas-baseball-cap",
    "brand": "Buck Mason",
    "model": "Craftsman Canvas Baseball Cap",
    "category": "cap",
    "colors": [
      "stone",
      "olive",
      "brown"
    ],
    "styleTags": [
      "heritage",
      "6-panel",
      "7.5oz sueded cotton canvas",
      "suede cinch tab",
      "brass hardware"
    ],
    "size": "Your size — six-panel with a suede cinch tab + back tab for fit adjustment; one-size adjus…",
    "why": "The cream/stone cap he's missing — a sueded-canvas 6-panel in a warm natural that pairs with the brown boots and the olive/brown layers, and matches the Craftsman Canvas field jacket if he w…",
    "trend": "Timeless. Sueded-canvas heritage caps are the quiet-luxe end of the ca…",
    "fitNote": "Suede cinch-tab adjustment gives a clean, non-bulky fit on a bigger head — no snapback plastic.",
    "price": 45,
    "buyUrl": "https://www.buckmason.com/collections/craftsman-canvas"
  }
]) as RawItem[];

export const WARDROBE: WardrobeItem[] = RAW.map((r) => ({ ...r, slot: SLOT_FOR_CATEGORY[r.category] }));
export const PALETTE: Palette[] = ["white", "cream", "stone", "olive", "brown", "blue", "black"];
