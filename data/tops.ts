import type { TopGarment } from "../lib/tops";

/**
 * Generated from the tops-fit research workflow (2026-06-02): real garment specs by size
 * for an athletic 6'1" 225 build. chest = garment circumference (pit-to-pit x2); shoulder =
 * seam-to-seam across the back; length = HPS to hem; neck = collar size (collared only).
 *
 * Sleeve numbers are kept for reference but NOT scored in v1: brands publish sleeve on
 * incompatible conventions (short-sleeve shoulder-to-cuff ~9" vs dress-shirt center-back-
 * to-cuff ~35"), so comparing them to one body number would be dishonest. The engine only
 * scores a dimension the body profile carries, and the body profile omits sleeve.
 *
 * provenance: "measured" = from a published size chart; "estimated" = our best fill from the
 * brand's block, never passed off as fact. The catalog deliberately spans fitted -> boxy
 * (incl. the J.Crew slim oxford as a "Skip" baseline) so the engine can recommend AND warn.
 */
export const TOPS: TopGarment[] = [
  {
    "id": "uniqlo-u-crew-neck-heavyweight-tee",
    "brand": "Uniqlo",
    "model": "U Crew Neck Short-Sleeve T-Shirt (Heavyweight)",
    "category": "tee",
    "fitType": "regular heavyweight set-in",
    "fitFeel": "regular",
    "fabric": "Heavyweight 100% cotton jersey (~7.5oz / ~255gsm), structured combed cotton, set-in shoulder",
    "stretchPct": 0,
    "price": 25,
    "buyUrl": "https://www.uniqlo.com/us/en/products/E433028-000/00",
    "sourceUrl": "https://sizecharter.com/brands/uniqlo/mens",
    "provenance": "measured",
    "athleticFitNotes": "Uniqlo publishes body chest ranges; chest here is the garment built to those ranges plus ease. True regular fit, set-in (not dropped) shoulder, heavy hand that holds shape. At L (42.5in garment) the set-in seam sits ~1in INSIDE his 19.5in shoulder (-1.0 ease) so it reads fitted-through-the-yoke and tugs at the joint. XL (45.5in chest, 19.5in shoulder) lands the seam right at his shoulder edge (0.0) with +4.5in chest drape - the better pick despite the roomier waist.",
    "sizes": [
      {
        "label": "S",
        "chest": 36.5,
        "shoulder": 17,
        "sleeve": 8.5,
        "length": 27
      },
      {
        "label": "M",
        "chest": 39.5,
        "shoulder": 17.75,
        "sleeve": 8.75,
        "length": 28
      },
      {
        "label": "L",
        "chest": 42.5,
        "shoulder": 18.5,
        "sleeve": 9,
        "length": 29
      },
      {
        "label": "XL",
        "chest": 45.5,
        "shoulder": 19.5,
        "sleeve": 9.5,
        "length": 30
      },
      {
        "label": "XXL",
        "chest": 48.5,
        "shoulder": 20.5,
        "sleeve": 9.75,
        "length": 31
      }
    ]
  },
  {
    "id": "cos-oversized-heavyweight-290g-tee",
    "brand": "COS",
    "model": "The Heavy Duty T-Shirt (Oversized Heavyweight)",
    "category": "tee",
    "fitType": "boxy oversized heavyweight drop-shoulder",
    "fitFeel": "boxy",
    "fabric": "Heavyweight organic cotton jersey ~290-320gsm, mock/structured neck, dropped shoulder",
    "stretchPct": 0,
    "price": 45,
    "buyUrl": "https://www.cos.com/en-us/men/menswear/tshirts/oversized-fit/product/the-heavy-duty-t-shirt-white-1147848001",
    "sourceUrl": "https://www.cos.com/en-us/men/menswear/tshirts/oversized-fit/product/the-heavy-duty-t-shirt-black-1147848002",
    "provenance": "estimated",
    "athleticFitNotes": "COS publishes only back length (M ~28.75in); chest/shoulder/sleeve estimated from the oversized block (runs ~1 full size large, heavily dropped shoulder). THE 2026 boxy-heavyweight archetype. SIZE DOWN to S: S runs 46in chest (+5) with a 20in dropped shoulder (+0.5) his broad frame fills cleanly, and 290gsm+ drapes with body not cling. At his usual L this is a tent (52in / +11). XS (43in / +2, 19in shoulder / -0.5) reads too tight up top. Watch-out: even S length ~28in is borderline at 6'1in, no Tall make.",
    "sizes": [
      {
        "label": "XS",
        "chest": 43,
        "shoulder": 19,
        "sleeve": 8.5,
        "length": 27.5
      },
      {
        "label": "S",
        "chest": 46,
        "shoulder": 20,
        "sleeve": 9,
        "length": 28
      },
      {
        "label": "M",
        "chest": 49,
        "shoulder": 21,
        "sleeve": 9.5,
        "length": 28.75
      },
      {
        "label": "L",
        "chest": 52,
        "shoulder": 22,
        "sleeve": 10,
        "length": 29.5
      },
      {
        "label": "XL",
        "chest": 55,
        "shoulder": 23,
        "sleeve": 10.5,
        "length": 30.25
      }
    ]
  },
  {
    "id": "abercrombie-premium-heavyweight-2-tee",
    "brand": "Abercrombie & Fitch",
    "model": "Premium Heavyweight 2.0 Tee",
    "category": "tee",
    "fitType": "regular heavyweight set-in (Tall available)",
    "fitFeel": "regular",
    "fabric": "Heavyweight cotton jersey with ~2pct elastane, mid-weight structured hand, set-in shoulder",
    "stretchPct": 2,
    "price": 40,
    "buyUrl": "https://www.abercrombie.com/shop/us/p/premium-heavyweight-20-tee-58965824",
    "sourceUrl": "https://www.apartstyle.com/post/abercrombie-and-fitch-regular-vs-tall",
    "provenance": "estimated",
    "athleticFitNotes": "Confirmed: M body length 28.25in. A&F Tall keeps the SAME chest/width as regular and adds ~1.5-2in to body + sleeve (LT/XLT). Best everyday pick: LT gives L chest room (44in / +3, clean regular skim over the developed chest) PLUS the length his long torso needs so it stays tucked-adjacent and never flashes midriff. Shoulder at L/LT is 19in (-0.5) so the set-in seam sits a hair inside the joint - fine on soft heavyweight, and the ~2pct elastane closes it. LT everyday; L for shorter/boxier; XLT for relaxed drape.",
    "sizes": [
      {
        "label": "S",
        "chest": 38,
        "shoulder": 17.5,
        "sleeve": 8.5,
        "length": 27.25
      },
      {
        "label": "M",
        "chest": 41,
        "shoulder": 18.25,
        "sleeve": 8.75,
        "length": 28.25
      },
      {
        "label": "L",
        "chest": 44,
        "shoulder": 19,
        "sleeve": 9,
        "length": 29.25
      },
      {
        "label": "XL",
        "chest": 47,
        "shoulder": 19.75,
        "sleeve": 9.5,
        "length": 30.25
      },
      {
        "label": "XXL",
        "chest": 50,
        "shoulder": 20.5,
        "sleeve": 9.75,
        "length": 31.25
      },
      {
        "label": "LT",
        "chest": 44,
        "shoulder": 19,
        "sleeve": 9.75,
        "length": 31
      },
      {
        "label": "XLT",
        "chest": 47,
        "shoulder": 19.75,
        "sleeve": 10.25,
        "length": 32
      }
    ]
  },
  {
    "id": "buck-mason-slub-curved-hem-tee",
    "brand": "Buck Mason",
    "model": "Slub Curved Hem Tee (Tall available)",
    "category": "tee",
    "fitType": "regular slub knit curved-hem set-in (Tall +1.5in)",
    "fitFeel": "regular",
    "fabric": "Slub cotton jersey, soft textured drape (lighter than a true heavyweight), curved/longer back hem, set-in shoulder",
    "stretchPct": 0,
    "price": 48,
    "buyUrl": "https://www.buckmason.com/products/white-slub-curved-hem-tee",
    "sourceUrl": "https://www.buckmason.com/feature/tee-fit-guide",
    "provenance": "measured",
    "athleticFitNotes": "Pit-to-pit and length are published spec values (chest = 2x pit); shoulder/sleeve estimated from Buck Mason's classic block. Slub fabric skims rather than holds a boxy shape. L (42in / +1 chest, 18.75in shoulder / -0.75) is close-but-not-clinging with the curved hem giving a longer front-to-back line that flatters the V-taper, but the -0.75 shoulder reads trim up top. The Tall Curved Hem (LT, 42in chest, length 30.5in) is the better call for 6'1in so the hem doesn't ride short. Avoid the M data point (runs full on chest but 27in length too short for his torso).",
    "sizes": [
      {
        "label": "S",
        "chest": 39,
        "shoulder": 17.5,
        "sleeve": 8.5,
        "length": 26
      },
      {
        "label": "M",
        "chest": 41,
        "shoulder": 18,
        "sleeve": 8.75,
        "length": 27
      },
      {
        "label": "L",
        "chest": 42,
        "shoulder": 18.75,
        "sleeve": 9,
        "length": 29
      },
      {
        "label": "XL",
        "chest": 44,
        "shoulder": 19.5,
        "sleeve": 9.5,
        "length": 29
      },
      {
        "label": "XXL",
        "chest": 48,
        "shoulder": 20.5,
        "sleeve": 9.75,
        "length": 30
      },
      {
        "label": "LT",
        "chest": 42,
        "shoulder": 18.75,
        "sleeve": 9.5,
        "length": 30.5
      },
      {
        "label": "XLT",
        "chest": 44,
        "shoulder": 19.5,
        "sleeve": 10,
        "length": 30.5
      }
    ]
  },
  {
    "id": "wax-london-dean-boxy-tee",
    "brand": "Wax London",
    "model": "Dean T-Shirt (Boxy, 280g textured organic jersey)",
    "category": "tee",
    "fitType": "boxy heavyweight short-body drop-shoulder",
    "fitFeel": "boxy",
    "fabric": "280g textured organic cotton jersey, structured, slightly dropped shoulder, shorter boxy body",
    "stretchPct": 0,
    "price": 70,
    "buyUrl": "https://waxlondon.com/products/dean-t-shirt-textured-walnut",
    "sourceUrl": "https://www.evo.com/pages/wax-london-clothing-size-chart",
    "provenance": "measured",
    "athleticFitNotes": "Published chest chart (XS 38.6 / S 40.6 / M 42.5 / L 44.9in); shoulder/sleeve estimated. Explicitly a SHORTER, boxier fit with slightly dropped shoulders; 280g jersey gives real structure so it drapes with body - the elevated-boxy look he wants. M (42.5in / +1.5 chest, 19.5in shoulder / 0.0) is the intended boxy fit. THE CATCH is LENGTH: M is 26in, L ~26.5in, crop-adjacent on a 6'1in frame - the silent-killer dimension here, not fit-up-top. Works untucked with high-rise trousers; if he wants real coverage, A&F XLT or an Asket Long wins. No Tall make.",
    "sizes": [
      {
        "label": "XS",
        "chest": 38.6,
        "shoulder": 18,
        "sleeve": 8.5,
        "length": 25.2
      },
      {
        "label": "S",
        "chest": 40.6,
        "shoulder": 18.75,
        "sleeve": 8.75,
        "length": 25.6
      },
      {
        "label": "M",
        "chest": 42.5,
        "shoulder": 19.5,
        "sleeve": 9,
        "length": 26
      },
      {
        "label": "L",
        "chest": 44.9,
        "shoulder": 20.5,
        "sleeve": 9.25,
        "length": 26.5
      },
      {
        "label": "XL",
        "chest": 47.2,
        "shoulder": 21.5,
        "sleeve": 9.5,
        "length": 27
      }
    ]
  },
  {
    "id": "lady-white-co-our-tee",
    "brand": "Lady White Co.",
    "model": "Our T-Shirt (2-pack)",
    "category": "tee",
    "fitType": "regular-classic premium jersey set-in",
    "fitFeel": "regular",
    "fabric": "Mid-heavy combed cotton jersey, ribbed collar, USA-made, structured-soft hand",
    "stretchPct": 0,
    "price": 95,
    "buyUrl": "https://ladywhiteco.com/products/our-t-shirt-2-pack-white",
    "sourceUrl": "https://ladywhiteco.com/collections/our-t-shirt",
    "provenance": "measured",
    "athleticFitNotes": "Published flat half-chest doubled to circumference; shoulder/sleeve from LWC's chart (shoulder jumps S->L because larger sizes include a softly dropped yoke). Refined regular fit. M (42in / +1 chest) skims the chest but its 17.5in shoulder is -2.0 vs his 19.5in - a hard fail, the seam bites well inside the joint. L (45in / +4 chest, 20.5in shoulder / +1.0) gives a softer relaxed drape, the bigger shoulder accommodates his build comfortably, and 27in length suits his torso. L is clearly the everyday pick. White/cream/black are dead-on palette.",
    "sizes": [
      {
        "label": "S",
        "chest": 40,
        "shoulder": 16,
        "sleeve": 7.5,
        "length": 25
      },
      {
        "label": "M",
        "chest": 42,
        "shoulder": 17.5,
        "sleeve": 8,
        "length": 26
      },
      {
        "label": "L",
        "chest": 45,
        "shoulder": 20.5,
        "sleeve": 8.5,
        "length": 27
      },
      {
        "label": "XL",
        "chest": 46,
        "shoulder": 21,
        "sleeve": 9,
        "length": 28
      }
    ]
  },
  {
    "id": "flint-and-tinder-open-weave-camp-collar-shirt",
    "brand": "Flint and Tinder",
    "model": "Open Weave Camp Collar Shirt",
    "category": "button-up",
    "fitType": "relaxed camp short-sleeve",
    "fitFeel": "boxy",
    "fabric": "Open-weave breathable cotton, camp/revere collar (no neckband), boxy short-sleeve resort cut",
    "stretchPct": 0,
    "price": 98,
    "buyUrl": "https://huckberry.com/store/flint-and-tinder/category/p/91052-open-weave-camp-collar-shirt",
    "sourceUrl": "https://huckberry.com/store/flint-and-tinder/category/p/91052-open-weave-camp-collar-shirt",
    "provenance": "estimated",
    "athleticFitNotes": "Huckberry page is JS-gated; measurements estimated from F&T's camp-collar block (relaxed boxy resort fit, true-to-generous). Camp collar has NO neckband so his 18in neck is a non-issue (neck not scored). The relaxed/camp archetype he wants. L (48in / +7 chest, 19.75in shoulder / +0.25) gives the intended relaxed drape with room to layer over a tee, and the boxy cut means his broad shoulders never strain the yoke. Worn open it relaxes a notch further. Short straight sleeve sits mid-bicep on developed arms. Olive/stone/blue open-weave is dead-on palette.",
    "sizes": [
      {
        "label": "S",
        "chest": 42,
        "shoulder": 18,
        "sleeve": 9,
        "length": 28
      },
      {
        "label": "M",
        "chest": 45,
        "shoulder": 18.75,
        "sleeve": 9.5,
        "length": 29
      },
      {
        "label": "L",
        "chest": 48,
        "shoulder": 19.75,
        "sleeve": 10,
        "length": 30
      },
      {
        "label": "XL",
        "chest": 51,
        "shoulder": 20.75,
        "sleeve": 10.5,
        "length": 31
      },
      {
        "label": "XXL",
        "chest": 54,
        "shoulder": 21.5,
        "sleeve": 11,
        "length": 32
      }
    ]
  },
  {
    "id": "buck-mason-japanese-chambray-station-shirt",
    "brand": "Buck Mason",
    "model": "Japanese Chambray Station Shirt (L053)",
    "category": "button-up",
    "fitType": "regular-relaxed work shirt full-neckband",
    "fitFeel": "regular",
    "fabric": "Japanese chambray, garment-washed, two chest pockets, classic work-shirt cut, full neckband collar",
    "stretchPct": 0,
    "price": 98,
    "buyUrl": "https://www.buckmason.com/products/l053-japanese-chambray-station-shirt",
    "sourceUrl": "https://www.buckmason.com/products/l053-japanese-chambray-station-shirt",
    "provenance": "estimated",
    "athleticFitNotes": "Confirmed: XL pit-to-pit 25in (50in garment), length 31in. Rest scaled ~2in/size from Buck Mason's work-shirt block. Classic/relaxed work shirt, full collar with neckband. L (48in / +7 chest, 19in shoulder / -0.5) clears his chest and broad shoulders easily with no placket pull - the classic athletic killer avoided. BUT the neckband is drafted around ~16in neck at L, so his 18in neck (-2.0) means he MUST wear it OPEN; buttoned would choke. Long sleeve 25.5in vs his 24.5in (+1.0) is good. Garment-washed blue is on-palette. L worn open / sleeves rolled; XL for outer-layer roominess.",
    "sizes": [
      {
        "label": "S",
        "chest": 44,
        "shoulder": 17.5,
        "sleeve": 24,
        "length": 29,
        "neck": 15
      },
      {
        "label": "M",
        "chest": 46,
        "shoulder": 18.25,
        "sleeve": 24.75,
        "length": 30,
        "neck": 15.5
      },
      {
        "label": "L",
        "chest": 48,
        "shoulder": 19,
        "sleeve": 25.5,
        "length": 30.5,
        "neck": 16
      },
      {
        "label": "XL",
        "chest": 50,
        "shoulder": 19.75,
        "sleeve": 26,
        "length": 31,
        "neck": 16.5
      },
      {
        "label": "XXL",
        "chest": 53,
        "shoulder": 20.5,
        "sleeve": 26.5,
        "length": 32,
        "neck": 17
      }
    ]
  },
  {
    "id": "jcrew-slim-ludlow-oxford-shirt",
    "brand": "J.Crew",
    "model": "Slim-Fit Ludlow Oxford Shirt (deliberate POOR-fit baseline)",
    "category": "button-up",
    "fitType": "slim oxford narrow tapered",
    "fitFeel": "fitted",
    "fabric": "Cotton oxford cloth, woven non-stretch, structured collar with neckband, slim 1in chest-to-waist taper",
    "stretchPct": 0,
    "price": 80,
    "buyUrl": "https://factory.jcrew.com/p/mens/categories/clothing/shirts/casual-shirts/flex-casual-oxford-shirt/J6180",
    "sourceUrl": "https://www.shirtdetective.com/j-crew-shirt-sizing/",
    "provenance": "measured",
    "athleticFitNotes": "THE SKIP BASELINE - the shirt equivalent of the 510 Skinny. Published garment chest by collar size; J.Crew states slim is 2in narrower than classic with a 1in chest-to-waist taper, cut for a straight/lean torso and actively fighting a V-shape. To clear his 41in chest he needs ~15.5-16 collar (42-44in), but those grade narrow shoulders (~18in / -1.5) and a hard waist taper - the seam pulls onto his deltoid, the yoke strains, the armhole binds, and any size that fits his 18in neck (17-17.5 collar = 48-50in) tents everywhere else. No size fits neck, shoulder, chest AND waist together. The engine must bottom out and flag: SKIP - buy athletic-cut instead.",
    "sizes": [
      {
        "label": "S",
        "chest": 40,
        "shoulder": 17.25,
        "sleeve": 33,
        "length": 29,
        "neck": 15
      },
      {
        "label": "M",
        "chest": 42,
        "shoulder": 18,
        "sleeve": 34,
        "length": 30,
        "neck": 15.5
      },
      {
        "label": "L",
        "chest": 44,
        "shoulder": 18.5,
        "sleeve": 34.5,
        "length": 31,
        "neck": 16
      },
      {
        "label": "XL",
        "chest": 46,
        "shoulder": 19,
        "sleeve": 35,
        "length": 31.5,
        "neck": 16.5
      },
      {
        "label": "XXL",
        "chest": 48,
        "shoulder": 19.5,
        "sleeve": 35.5,
        "length": 32,
        "neck": 17
      }
    ]
  },
  {
    "id": "state-and-liberty-athletic-dress-shirt",
    "brand": "State & Liberty",
    "model": "Athletic Fit Performance Dress Shirt",
    "category": "button-up",
    "fitType": "athletic slim stretch (broad shoulder, tapered waist)",
    "fitFeel": "fitted",
    "fabric": "4-way stretch performance polyester/spandex, moisture-wicking, athletic block with extra upper-body room + tapered waist",
    "stretchPct": 30,
    "price": 125,
    "buyUrl": "https://stateandliberty.com/products/the-springer-solid-white",
    "sourceUrl": "https://stateandliberty.com/pages/size-chart",
    "provenance": "measured",
    "athleticFitNotes": "Published chart is a BODY fit-guide (neck/sleeve/height/weight ranges); the brand fits to body because ~30pct 4-way stretch does the work. Garment chest is intentionally trimmer than a classic shirt but the stretch closes the gap - it reads fitted/athletic, the tailored look WITHOUT the slim-oxford failure. THE ANTI-SKIP. By his measures (6'1in, 225lb, 18in neck) he lands L bordering XL; at 225lb and 41in chest, XL (47in / +6 chest, 19.75in shoulder / +0.25, 17.5in neck / -0.5) is the safer call for clean placket lines. With 30pct stretch the chest/shoulder under-penalty floors out - the gold-standard tailored-shirt option for his build. Sleeve (35in) is full-arm long-sleeve length graded on his ~33-36in arm range, not the boxy-tee convention.",
    "sizes": [
      {
        "label": "S",
        "chest": 38,
        "shoulder": 17.5,
        "sleeve": 33,
        "length": 29.5,
        "neck": 15
      },
      {
        "label": "M",
        "chest": 41,
        "shoulder": 18.25,
        "sleeve": 33,
        "length": 30,
        "neck": 16
      },
      {
        "label": "L",
        "chest": 44,
        "shoulder": 19,
        "sleeve": 34,
        "length": 30.5,
        "neck": 16.75
      },
      {
        "label": "XL",
        "chest": 47,
        "shoulder": 19.75,
        "sleeve": 35,
        "length": 31,
        "neck": 17.5
      },
      {
        "label": "XXL",
        "chest": 50,
        "shoulder": 20.5,
        "sleeve": 35.5,
        "length": 31.5,
        "neck": 18.25
      }
    ]
  },
  {
    "id": "western-rise-limitless-merino-overshirt",
    "brand": "Western Rise",
    "model": "Limitless Merino Button-Down Shirt",
    "category": "overshirt",
    "fitType": "regular travel button-down (merino blend, slight stretch)",
    "fitFeel": "regular",
    "fabric": "Merino wool blend, wrinkle-resistant, slight natural stretch, regular travel cut with full collar/neckband",
    "stretchPct": 8,
    "price": 148,
    "buyUrl": "https://westernrise.com/products/limitless-shirt",
    "sourceUrl": "https://www.urbankitsupply.com/pages/size-chart-wr-limitless-merino-button-down",
    "provenance": "measured",
    "athleticFitNotes": "Full published GARMENT chart. The shoulder spec is the key: L gives 19.7in shoulder vs his 19.5in seam-to-seam (+0.2, almost exact - rare for a regular shirt), so the seam sits right at his edge with no pull. L chest (44.1in / +3.1) clears his chest with recommended ease and the 8pct merino stretch handles his developed chest/arms. Front length 29.1in suits his torso; long sleeve 37in is graded on full arm length and is fine. M would pull (41.3in / zero ease) - go L. Neck 16.5in at L is -1.5 so wear OPEN as a shirt or light overshirt; open relaxes a notch. Merino + olive/stone/blue suit elevated-heritage travel-casual.",
    "sizes": [
      {
        "label": "S",
        "chest": 40.2,
        "shoulder": 18.1,
        "sleeve": 35.4,
        "length": 27.6,
        "neck": 15.5
      },
      {
        "label": "M",
        "chest": 41.3,
        "shoulder": 18.9,
        "sleeve": 36.2,
        "length": 28.3,
        "neck": 16
      },
      {
        "label": "L",
        "chest": 44.1,
        "shoulder": 19.7,
        "sleeve": 37,
        "length": 29.1,
        "neck": 16.5
      },
      {
        "label": "XL",
        "chest": 45.7,
        "shoulder": 20.1,
        "sleeve": 38.2,
        "length": 29.1,
        "neck": 17
      },
      {
        "label": "XXL",
        "chest": 48.4,
        "shoulder": 20.5,
        "sleeve": 39,
        "length": 29.9,
        "neck": 17.5
      }
    ]
  }
];
