import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FilterRule } from '../utils/types';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';

type Props = {
  id: string;
  rule: FilterRule;
  onEdit: () => void;
  onDelete: () => void;
};

export function SortableItem({ id, rule, onEdit, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg border border-red-900 shadow-lg group hover:shadow-xl transition-all duration-200"
    >
      <button
        className="text-gray-500 hover:text-red-500 cursor-grab active:cursor-grabbing transition-colors duration-200"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>

      <div className="flex-grow">
        <div className="font-medium text-gray-200">{rule.show ? 'Show' : 'Hide'}</div>
        <div className="text-sm text-gray-400">
          {rule.class && rule.class.length > 0 && (
            <span className="mr-2">Class: {rule.class.join(", ")}</span>
          )}
          {rule.baseType && rule.baseType.length > 0 && (
            <span className="mr-2">Base Type: {rule.baseType.join(", ")}</span>
          )}
          {rule.rarity && (
            <span className="mr-2">
              Rarity {rule.rarity.comparator} {rule.rarity.value}
            </span>
          )}
          {rule.areaLevel && (
            <span className="mr-2">
              Area Level {rule.areaLevel.comparator} {rule.areaLevel.value}
            </span>
          )}
          {rule.minimapIcon && (
            <span className="mr-2">
              Icon: {rule.minimapIcon.color} {rule.minimapIcon.shape} ({rule.minimapIcon.size})
            </span>
          )}
          {rule.beamEffect && (
            <span>
              Beam: {rule.beamEffect.color}{rule.beamEffect.temporary ? ' (Temp)' : ''}
            </span>
          )}
        </div>
      </div>

      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-1 text-gray-500 hover:text-red-500 rounded transition-colors duration-200"
          title="Edit rule"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-gray-500 hover:text-red-500 rounded transition-colors duration-200"
          title="Delete rule"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
