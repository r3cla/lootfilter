// Minimap icon shapes available for filter customization
export const MINIMAP_SHAPES = [
    "Circle",
    "Diamond",
    "Hexagon",
    "Square",
    "Star",
    "Triangle",
    "Cross",
    "Moon",
    "Raindrop",
    "Kite",
    "Pentagon",
    "UpsideDownHouse",
  ] as const;
  
  // Colors available for minimap icons and beam effects
  export const EFFECT_COLORS = [
    "Red",
    "Green",
    "Blue",
    "Brown",
    "White",
    "Yellow",
    "Cyan",
    "Grey",
    "Orange",
    "Pink",
    "Purple",
  ] as const;
  
  // Valid sizes for minimap icons
  export const MINIMAP_SIZES = [0, 1, 2] as const;
  
  // Type definitions for better TypeScript support
  export type MinimapShape = typeof MINIMAP_SHAPES[number];
  export type EffectColor = typeof EFFECT_COLORS[number];
  export type MinimapSize = typeof MINIMAP_SIZES[number];
  
  // Helper type for beam effects
  export type BeamEffect = {
    color: EffectColor;
    temporary?: boolean;
  };
  
  // Helper type for minimap icons
  export type MinimapIcon = {
    size: MinimapSize;
    color: EffectColor;
    shape: MinimapShape;
  };
  