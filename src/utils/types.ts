import type { MinimapIcon, BeamEffect } from './filterCustomization';

export type RGBColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type Comparator = '==' | '<=' | '>=' | '>' | '<';

export type ComparedValue<T> = {
  value: T;
  comparator: Comparator;
};

export type FilterRule = {
  id: string;
  show: boolean;
  class?: string[];
  baseType?: string[];
  rarity?: ComparedValue<'Normal' | 'Magic' | 'Rare' | 'Unique'>;
  areaLevel?: ComparedValue<number>;
  backgroundColor?: RGBColor;
  textColor?: RGBColor;
  borderColor?: RGBColor;
  fontSize?: 'Small' | 'Medium' | 'Large';
  sound?: number;
  minimapIcon?: MinimapIcon;
  beamEffect?: BeamEffect;
};

export type FilterRuleFormData = Omit<FilterRule, 'id'>;
