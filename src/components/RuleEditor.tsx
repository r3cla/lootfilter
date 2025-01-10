import React from 'react';
import { FilterRuleFormData, Comparator, RGBColor } from '../utils/types';
import { MINIMAP_SHAPES, EFFECT_COLORS, MINIMAP_SIZES } from '../utils/filterCustomization';
import { ITEM_CLASSES, BASE_TYPES } from '../utils/itemData';
import Select from 'react-select';

// Convert alpha (0-255) to percentage (0-100)
function alphaToPercentage(alpha: number): number {
  return Math.round((alpha / 255) * 100);
}

// Convert percentage (0-100) to alpha (0-255)
function percentageToAlpha(percentage: number): number {
  return Math.round((percentage / 100) * 255);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Common class strings
const baseInputClasses = "w-full p-2 bg-gray-700 border border-red-900 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700";
const labelClasses = "block text-sm font-medium text-gray-200";
const selectClasses = "text-sm [&_.select__control]:p-2 [&_.select__control]:bg-gray-700 [&_.select__control]:border-red-900 [&_.select__control]:rounded [&_.select__control]:text-gray-200 [&_.select__menu]:bg-gray-700 [&_.select__menu]:border [&_.select__menu]:border-red-900 [&_.select__option]:text-gray-200 [&_.select__option]:bg-gray-700 [&_.select__option--is-focused]:bg-red-900 [&_.select__option--is-selected]:bg-red-800 [&_.select__single-value]:text-gray-200 [&_.select__input-container]:text-gray-200 [&_.select__multi-value]:bg-red-900 [&_.select__multi-value__label]:text-gray-200 [&_.select__multi-value__remove]:text-gray-200 [&_.select__multi-value__remove:hover]:bg-red-950 [&_.select__control:hover]:border-red-800 [&_.select__dropdown-indicator]:text-gray-200 [&_.select__menu-list]:bg-gray-700 [&_.select__placeholder]:text-gray-400";

type Props = {
  initialData?: FilterRuleFormData;
  onSave: (data: FilterRuleFormData) => void;
  onCancel: () => void;
};

export function RuleEditor({ initialData, onSave, onCancel }: Props) {
  const [formData, setFormData] = React.useState<FilterRuleFormData>(initialData || {
    show: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-800 rounded-lg border border-red-900 shadow-lg">
      <h2 className="text-lg font-medium">Filter Rules</h2>
      {/* Show/Hide Checkbox */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <input
            type="checkbox"
            checked={formData.show}
            onChange={(e) => setFormData({ ...formData, show: e.target.checked })}
            className="mr-2 accent-red-600"
          />
          Show items (unchecked = hide)
        </label>
      </div>

      {/* Item Class Select */}
       <select
        value={formData.class?.[0] || ''}
        onChange={(e) => setFormData({
          ...formData,
          class: e.target.value ? [e.target.value] : [],
          baseType: [],
        })}
        className={baseInputClasses}
      >
        <option value="">Select item class...</option>
        {ITEM_CLASSES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Base Type Select */}
      <div className="space-y-2">
        <label className={labelClasses}>Base Type</label>
        <select
          value={formData.baseType?.[0] || ''}
          onChange={(e) => setFormData({
            ...formData,
            baseType: e.target.value ? [e.target.value] : []
          })}
          disabled={!formData.class || formData.class.length === 0}
          className={baseInputClasses}
        >
          <option value="">Select base type...</option>
          {formData.class && formData.class.flatMap((c) => BASE_TYPES[c] || []).map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Rarity Section */}
      <div className="space-y-2">
        <label className={labelClasses}>Rarity</label>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={formData.rarity?.comparator || ''}
            onChange={(e) => {
              const comparator = e.target.value as Comparator;
              setFormData({
                ...formData,
                rarity: comparator
                  ? {
                      comparator,
                      value: formData.rarity?.value || 'Normal',
                    }
                  : undefined,
              });
            }}
            className={baseInputClasses}
          >
            <option value="">No Filter</option>
            <option value="==">Equal to (==)</option>
            <option value="<=">Equal To Or Less Than (&lt;=)</option>
            <option value=">=">Equal To Or Greater Than (&gt;=)</option>
            <option value=">">Greater Than (&gt;)</option>
            <option value="<">Less Than (&lt;)</option>
          </select>

          <select
            value={formData.rarity?.value || ''}
            onChange={(e) => {
              const value = e.target.value as 'Normal' | 'Magic' | 'Rare' | 'Unique';
              setFormData({
                ...formData,
                rarity: value
                  ? {
                      value,
                      comparator: formData.rarity?.comparator || '==',
                    }
                  : undefined,
              });
            }}
            disabled={!formData.rarity?.comparator}
            className={baseInputClasses}
          >
            <option value="Normal">Normal</option>
            <option value="Magic">Magic</option>
            <option value="Rare">Rare</option>
            <option value="Unique">Unique</option>
          </select>
        </div>
      </div>

      {/* Area Level Section */}
      <div className="space-y-2">
        <label className={labelClasses}>Area Level</label>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={formData.areaLevel?.comparator || ''}
            onChange={(e) => {
              const comparator = e.target.value as Comparator;
              setFormData({
                ...formData,
                areaLevel: comparator
                  ? {
                      comparator,
                      value: formData.areaLevel?.value || 1,
                    }
                  : undefined,
              });
            }}
            className={baseInputClasses}
          >
            <option value="">No Filter</option>
            <option value="==">Equal to (==)</option>
            <option value="<=">Equal To Or Less Than (&lt;=)</option>
            <option value=">=">Equal To Or Greater Than (&gt;=)</option>
            <option value=">">Greater Than (&gt;)</option>
            <option value="<">Less Than (&lt;)</option>
          </select>

          <input
            type="number"
            value={formData.areaLevel?.value || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                areaLevel: e.target.value
                  ? {
                      value: parseInt(e.target.value),
                      comparator: formData.areaLevel?.comparator || '==',
                    }
                  : undefined,
              })
            }
            disabled={!formData.areaLevel?.comparator}
            className={baseInputClasses}
            min="1"
          />
        </div>
      </div>

      {/* Minimap Icon Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className={labelClasses}>Minimap Icon</label>
          <div className="grid grid-cols-3 gap-4">
            <select
              value={formData.minimapIcon?.size ?? ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minimapIcon: e.target.value 
                    ? {
                        ...formData.minimapIcon,
                        size: parseInt(e.target.value) as 0 | 1 | 2,
                        color: formData.minimapIcon?.color || EFFECT_COLORS[0],
                        shape: formData.minimapIcon?.shape || MINIMAP_SHAPES[0],
                      } 
                    : undefined
                })
              }
              className={baseInputClasses}
            >
              <option value="">No Icon</option>
              {MINIMAP_SIZES.map((size) => (
                <option key={size} value={size}>
                  Size {size}
                </option>
              ))}
            </select>

            <select
              value={formData.minimapIcon?.color || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minimapIcon: e.target.value 
                    ? {
                        size: formData.minimapIcon?.size ?? 0,
                        color: e.target.value as typeof EFFECT_COLORS[number],
                        shape: formData.minimapIcon?.shape ?? MINIMAP_SHAPES[0],
                      }
                    : undefined
                })
              }
              disabled={!formData.minimapIcon?.size}
              className={baseInputClasses}
            >
              {EFFECT_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <select
              value={formData.minimapIcon?.shape || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minimapIcon: {
                    size: formData.minimapIcon?.size ?? 0,
                    color: formData.minimapIcon?.color ?? EFFECT_COLORS[0],
                    shape: e.target.value as typeof MINIMAP_SHAPES[number],
                  }
                })
              }
              disabled={!formData.minimapIcon?.size}
              className={baseInputClasses}
            >
              {MINIMAP_SHAPES.map((shape) => (
                <option key={shape} value={shape}>
                  {shape}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Beam Effect Section */}
        <div className="space-y-2">
          <label className={labelClasses}>Beam Effect</label>
          <div className="flex items-center space-x-4">
            <select
              value={formData.beamEffect?.color || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  beamEffect: e.target.value
                    ? {
                        color: e.target.value as typeof EFFECT_COLORS[number],
                        temporary: formData.beamEffect?.temporary || false,
                      }
                    : undefined,
                })
              }
              className={baseInputClasses}
            >
              <option value="">No Beam</option>
              {EFFECT_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            {formData.beamEffect && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.beamEffect.temporary ?? false}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      beamEffect: prevData.beamEffect ? {
                        ...prevData.beamEffect,
                        temporary: e.target.checked,
                      } : undefined,
                    }))
                  }
                  className="rounded accent-red-600 bg-gray-700 border-red-900"
                />
                <span className="text-sm text-gray-200">Temporary</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Color Settings */}
      <div className="space-y-4">
        {/* Text Color */}
        <div className="space-y-2">
          <label className={labelClasses}>Text Color</label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={formData.textColor ? rgbToHex(formData.textColor.r, formData.textColor.g, formData.textColor.b) : '#000000'}
              onChange={(e) => {
                const rgb = hexToRgb(e.target.value);
                setFormData({
                  ...formData,
                  textColor: {
                    ...rgb,
                    a: formData.textColor?.a ?? 255,
                  },
                });
              }}
              className="h-10 w-20 bg-gray-700 border border-red-900 rounded cursor-pointer"
            />
            <div className="flex-1 space-y-1">
              <div className="flex justify-between">
                <label className="text-xs text-gray-400">Opacity</label>
                <span className="text-xs text-gray-400">{alphaToPercentage(formData.textColor?.a ?? 255)}%</span>
              </div>
              <input
                type="range"
                value={alphaToPercentage(formData.textColor?.a ?? 255)}
                onChange={(e) => {
                  const value = percentageToAlpha(parseInt(e.target.value));
                  setFormData({
                    ...formData,
                    textColor: {
                      ...(formData.textColor ?? { r: 0, g: 0, b: 0 }),
                      a: value,
                    },
                  });
                }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Border Color */}
        <div className="space-y-2">
          <label className={labelClasses}>Border Color</label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={formData.borderColor ? rgbToHex(formData.borderColor.r, formData.borderColor.g, formData.borderColor.b) : '#000000'}
              onChange={(e) => {
                const rgb = hexToRgb(e.target.value);
                setFormData({
                  ...formData,
                  borderColor: {
                    ...rgb,
                    a: formData.borderColor?.a ?? 255,
                  },
                });
              }}
              className="h-10 w-20 bg-gray-700 border border-red-900 rounded cursor-pointer"
            />
            <div className="flex-1 space-y-1">
              <div className="flex justify-between">
                <label className="text-xs text-gray-400">Opacity</label>
                <span className="text-xs text-gray-400">{alphaToPercentage(formData.borderColor?.a ?? 255)}%</span>
              </div>
              <input
                type="range"
                value={alphaToPercentage(formData.borderColor?.a ?? 255)}
                onChange={(e) => {
                  const value = percentageToAlpha(parseInt(e.target.value));
                  setFormData({
                    ...formData,
                    borderColor: {
                      ...(formData.borderColor ?? { r: 0, g: 0, b: 0 }),
                      a: value,
                    },
                  });
                }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Background Color */}
        <div className="space-y-2">
          <label className={labelClasses}>Background Color</label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={formData.backgroundColor ? rgbToHex(formData.backgroundColor.r, formData.backgroundColor.g, formData.backgroundColor.b) : '#000000'}
              onChange={(e) => {
                const rgb = hexToRgb(e.target.value);
                setFormData({
                  ...formData,
                  backgroundColor: {
                    ...rgb,
                    a: formData.backgroundColor?.a ?? 255,
                  },
                });
              }}
              className="h-10 w-20 bg-gray-700 border border-red-900 rounded cursor-pointer"
            />
            <div className="flex-1 space-y-1">
              <div className="flex justify-between">
                <label className="text-xs text-gray-400">Opacity</label>
                <span className="text-xs text-gray-400">{alphaToPercentage(formData.backgroundColor?.a ?? 255)}%</span>
              </div>
              <input
                type="range"
                value={alphaToPercentage(formData.backgroundColor?.a ?? 255)}
                onChange={(e) => {
                  const value = percentageToAlpha(parseInt(e.target.value));
                  setFormData({
                    ...formData,
                    backgroundColor: {
                      ...(formData.backgroundColor ?? { r: 0, g: 0, b: 0 }),
                      a: value,
                    },
                  });
                }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm border border-red-900 rounded hover:bg-gray-700 transition-colors duration-200 text-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-red-900 text-gray-200 rounded border border-red-700 shadow-lg hover:bg-red-800 hover:border-red-600 transition-colors duration-200"
        >
          Save Rule
        </button>
      </div>
    </form>
  );
}