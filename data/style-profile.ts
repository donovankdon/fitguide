export interface StyleProfile {
  vibe: string; palette: string; silhouette: string; trends2026: string; formula: string; coordinationRules: string;
}
export interface SignatureOutfit {
  name: string; top: string; bottom: string; shoe: string; layerOrCap?: string; why: string;
}

/** Generated from the wardrobe-research workflow — Don's 2026 style profile + stylist picks. */
export const STYLE_PROFILE: StyleProfile = {
  "vibe": "Elevated heritage-casual with a relaxed-tailoring lean: Florida-adapted, comfort-first, no-logo American workwear vocabulary (chambray, fatigue, chore coat, brown leather) that's been dialed forward into the 2026 pleated/wide-trouser silhouette. The throughline is intentional drape over a big athletic frame, never gym-bro cling.",
  "palette": "Locked six-color system: white, black, brown, olive, blue, cream. Everything inside it mixes, so any top works with any bottom by default. Strongest pairings: (1) Cream/white heavyweight tee + olive bottom + brown boot/suede chukka — the signature, the most \"him\" combo. (2) Blue chambray or mid-wash denim + cream/white + brown leather — classic heritage anchor. (3) Stone/tan pleated trouser + white or olive top + brown or white-leather shoe — the cleanest \"current/elevated\" read.",
  "silhouette": "6'1\", 225 athletic = lead with VOLUME ON THE BOTTOM, STRUCTURE ON TOP. The whole game is relaxed/pleated/wide-straight trousers that drape off the quads and seat instead of clinging, balanced by a boxy heavyweight tee (or relaxed camp shirt) with a slightly longer body that skims the chest rather than stretching across it. Proportion target: roomy-but-not-tent up top (size L for clean-boxy, XL for fuller drape; XL-Tall when a real tall make exists, e.g. Abercrombie 275g tee), full leg below, grounded by a substantial welted boot or chunky-enough sole so the foot doesn't look dainty under wide pants.",
  "trends2026": "LEAN HARD INTO: (1) Pleated + wide/relaxed trousers — the headline move and exactly what he asked for. Single/double-pleat, high-rise, full-leg cuts that drape; this is the entire pivot from \"heritage-casual\" to \"current heritage-casual.\" Entry point is the $50 Uniqlo Pleated Wide (get Tall), splurge is Buck Mason Hollywood or Todd Snyder Wythe. (2) Structured heavyweight boxy tee (250-290gsm) — the architectural, stands-off-the-body tee (COS 290g, Arket 270g, Wax London Dean 280g) is peak 2026 minimal-menswear and the perfect counterweight to the wide trouser.",
  "formula": "(boxy heavyweight tee OR relaxed camp/chambray shirt) + (pleated/wide-straight OR relaxed-straight bottom — pleated is now the default move) + (brown leather boot / cognac suede chukka / clean low leather sneaker / taupe suede sandal) + (optional: olive or brown chore coat/overshirt as the elevating layer, and/or an olive/cream/brown heritage cap).",
  "coordinationRules": "1) PALETTE LOCK: every piece must be one of white/black/brown/olive/blue/cream — if it is, it coordinates, full stop. 2) GROUND WITH BROWN: when in doubt, put a brown boot or cognac suede chukka on the feet; it anchors any of the six colors and is the single most \"him\" finishing move. 3) ONE LIGHT ANCHOR UP TOP: pair a light/neutral top (white, cream) with an earth or color bottom (olive, stone, blue, black) — this is the highest-hit combo. 4) TONAL FOR ELEVATED: cream tee + stone pleated trouser + off-white or tan leather sneaker reads the most \"current/designer.\" 5) ADD A LAYER FOR INTENT: an olive or brown chore coat / herringbone overshirt instantly elevates a plain tee-and-trouser fit — reach for it when the base fit feels too simple, and keep the layer in olive or brown to stay on palette."
};

export const SIGNATURE_OUTFITS: SignatureOutfit[] = [
  {
    "name": "The Statement Pleat (the new-direction hero)",
    "top": "Uniqlo U Crew Neck Heavyweight Tee in white or cream (XL), front tucked",
    "bottom": "Uniqlo Pleated Wide Pants — Tall (E462429) in olive",
    "shoe": "Thursday Scout Chukka in cognac suede (your size)",
    "layerOrCap": "Optional Taylor Stitch Ball Cap in olive",
    "why": "This is the whole pivot in one fit for under $270: the Tall pleated wide leg drapes off your quads instead of clinging, the boxy heavyweight tee tucked at the front sets the current proportion, and cognac suede + olive is dead-center your p…"
  },
  {
    "name": "Heritage Elevated (the splurge fit)",
    "top": "Wax London Dean Boxy Tee in ecru/cream (XL)",
    "bottom": "Buck Mason Hollywood Pleated Trouser in Classic Khaki/stone (38)",
    "shoe": "Oliver Cabell Low 1 in Off White or Lion/tan (your size)",
    "why": "Tonal cream-and-stone with a textured 280g boxy tee and a double-pleat cotton-linen trouser is the most grown-up, most 'current' look in the rotation."
  },
  {
    "name": "The Workwear Anchor",
    "top": "Buck Mason Japanese Chambray Station Shirt in blue (XL), sleeves rolled",
    "bottom": "Flint and Tinder 365 Pant in Military Olive (38x32)",
    "shoe": "Thursday Captain in brown leather (your size)",
    "layerOrCap": "Buck Mason Craftsman Canvas Cap in stone/cream",
    "why": "Pure heritage-workwear, your most natural lane: indigo chambray that fades like denim, an elevated olive utility pant (the grown-up Dickies), and the brown cap-toe boot you already love."
  },
  {
    "name": "Clean Florida Camp",
    "top": "Flint and Tinder Open Weave Camp Collar Shirt in cream (XL), open over a white tee",
    "bottom": "J.Crew Giant-fit Chino in stone/tan (38)",
    "shoe": "Birkenstock Arizona suede in Taupe/Sandcastle (your EU size)",
    "layerOrCap": "Buck Mason Craftsman Canvas Cap in stone/cream",
    "why": "Peak Florida elevated-casual: breezy open-weave camp collar over a clean white heavy tee, the roomiest chino J.Crew makes (built for hip and thigh), and the taupe suede Birkenstock that reads heritage, not beach."
  },
  {
    "name": "The Chore-Coat Level-Up",
    "top": "COS Oversized Heavyweight 290g Tee in white (L), front tucked",
    "bottom": "Levi's 559 Relaxed Straight in mid-wash blue (38x32)",
    "shoe": "Thursday Captain Heritage in Rustic Brown (your size)",
    "layerOrCap": "Taylor Stitch Ojai Chore Coat in Smoked Olive (XL)",
    "why": "The unstructured chore coat is the 2026 sport-coat alternative and instantly makes a tee-and-jeans fit look considered."
  },
  {
    "name": "Wide-Leg Denim, Modern",
    "top": "Abercrombie Premium Heavyweight 2.0 Tee in black, XL Tall",
    "bottom": "Uniqlo Wide Straight Jeans — Tall in indigo (38)",
    "shoe": "Cariuma OCA Low Premium Leather in white (your size)",
    "layerOrCap": "Black Taylor Stitch Ball Cap",
    "why": "Your $90 on-ramp to the wide-denim trend with real Tall sizing top and bottom — the XL-Tall 275g tee keeps a boxy heavyweight from riding up over your torso, and the Tall wide jean breaks correctly at the shoe."
  },
  {
    "name": "Cool-Evening Overshirt",
    "top": "Buck Mason Slub Curved Hem Tee in olive (XL)",
    "bottom": "Abercrombie Pleated Baggy Trouser in black (38x32)",
    "shoe": "Thursday Scout Chukka in cognac suede (your size)",
    "layerOrCap": "Taylor Stitch HBT Jacket in Washed Olive (XL), worn open",
    "why": "A slightly dressier night-out fit in your exact 38x32: the herringbone overshirt adds quiet texture, the black poplin pleated trouser is the trend in your true waist size, and olive-on-olive with a cognac chukka keeps it warm and intentiona…"
  },
  {
    "name": "The One Perfect Tee (minimalist anchor)",
    "top": "Lady White Co. Rugby Tee in Off White / Paper (your size, XL for drape)",
    "bottom": "Todd Snyder Relaxed Selvedge Chino in Olive (38)",
    "shoe": "Oliver Cabell Low 1 in Off White (your size)",
    "layerOrCap": "Optional Buck Mason Craftsman Canvas Cap in olive",
    "why": "The investment fit: a 10oz made-in-USA boxy tee that stands off the body and reads expensive, paired with a dry-soft vintage-military olive chino and a full-grain white sneaker."
  }
];

/** Live buy link for the BOTTOM (the pleated/wide trouser or jean) of each signature look,
 *  same order as SIGNATURE_OUTFITS — so the looks are shoppable, not just text. Verified 2026-06-02. */
export const SIGNATURE_BOTTOM_URLS: string[] = [
  "https://www.uniqlo.com/us/en/products/E462429-000/00", // Uniqlo Pleated Wide Tall (olive)
  "https://www.buckmason.com/products/classic-khaki-hollywood-pleated-trouser", // Buck Mason Hollywood Pleated
  "https://huckberry.com/store/flint-and-tinder/category/p/58172-365-pant-straight", // Flint & Tinder 365 (olive swatch)
  "https://www.jcrew.com/p/mens/categories/clothing/pants-and-chinos/chino/giant-fit-chino-pant/BI521", // J.Crew Giant-fit
  "https://www.levi.com/US/en_US/clothing/men/jeans/559TM-relaxed-straight-mens-jeans/p/005590590", // Levi's 559 Relaxed
  "https://www.uniqlo.com/us/en/products/E473319-000/00", // Uniqlo Wide Straight Tall (indigo)
  "https://www.abercrombie.com/shop/us/p/pleated-baggy-trouser-62973819", // A&F Pleated Baggy (black)
  "https://www.toddsnyder.com/collections/wythe-trousers", // Todd Snyder relaxed pleated trouser
];
