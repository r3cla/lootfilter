import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { FilterRule } from '../utils/types';

type Props = {
  rules: FilterRule[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  onEdit: (rule: FilterRule) => void;
  onDelete: (id: string) => void;
};

export function RuleList({ rules, onReorder, onEdit, onDelete }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = rules.findIndex((rule) => rule.id === active.id);
      const newIndex = rules.findIndex((rule) => rule.id === over.id);
      onReorder(oldIndex, newIndex);
    }
  };

  if (rules.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
      
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={rules.map((r) => r.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {rules.map((rule) => (
            <SortableItem
              key={rule.id}
              id={rule.id}
              rule={rule}
              onEdit={() => onEdit(rule)}
              onDelete={() => onDelete(rule.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
