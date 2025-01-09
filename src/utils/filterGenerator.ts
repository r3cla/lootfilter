import { FilterRule } from './types';

export function generateFilterFile(rules: FilterRule[]): string {
  return rules
    .map((rule) => {
      const lines = [];
      
      // Show/Hide statement
      lines.push(rule.show ? 'Show' : 'Hide');
      
      // Class
      if (rule.class && rule.class.length > 0) {
        lines.push(`    Class ${rule.class.join(' ')}`);
      }
      
      // Base Type
      if (rule.baseType && rule.baseType.length > 0) {
        lines.push(`    BaseType ${rule.baseType.join(' ')}`);
      }
      
      // Rarity
      if (rule.rarity) {
        lines.push(`    Rarity ${rule.rarity.comparator} ${rule.rarity.value}`);
      }
      
      // Area Level
      if (rule.areaLevel) {
        lines.push(`    AreaLevel ${rule.areaLevel.comparator} ${rule.areaLevel.value}`);
      }
      
      // Visual settings
      if (rule.backgroundColor) {
        lines.push(`    SetBackgroundColor ${rule.backgroundColor.r} ${rule.backgroundColor.g} ${rule.backgroundColor.b} ${rule.backgroundColor.a}`);
      }
      if (rule.textColor) {
        lines.push(`    SetTextColor ${rule.textColor.r} ${rule.textColor.g} ${rule.textColor.b} ${rule.textColor.a}`);
      }
      if (rule.borderColor) {
        lines.push(`    SetBorderColor ${rule.borderColor.r} ${rule.borderColor.g} ${rule.borderColor.b} ${rule.borderColor.a}`);
      }
      if (rule.fontSize) {
        lines.push(`    SetFontSize ${rule.fontSize}`);
      }
      
      // Sound
      if (rule.sound) {
        lines.push(`    PlayAlertSound ${rule.sound}`);
      }

      // Minimap Icon
      if (rule.minimapIcon) {
        lines.push(`    MinimapIcon ${rule.minimapIcon.size} ${rule.minimapIcon.color} ${rule.minimapIcon.shape}`);
      }

      // Beam Effect
      if (rule.beamEffect) {
        lines.push(`    PlayEffect ${rule.beamEffect.color}${rule.beamEffect.temporary ? ' Temp' : ''}`);
      }
      
      return lines.join('\n');
    })
    .join('\n\n');
}
