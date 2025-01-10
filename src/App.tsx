import React from "react";
import { Plus, Trash2, Github } from "lucide-react";
import { RuleEditor } from "./components/RuleEditor";
import { RuleList } from "./components/RuleList";
import { FilterPreview } from "./components/FilterPreview";
import { useStore } from "./utils/store";
import { FilterRule, FilterRuleFormData } from "./utils/types";
import { toast, Toaster } from "sonner";

export default function App() {
  const [editingRule, setEditingRule] = React.useState<FilterRule | null>(null);
  const [isAddingRule, setIsAddingRule] = React.useState(false);
  const { rules, addRule, updateRule, deleteRule, reorderRules, resetRules } = useStore();

  const handleReset = () => {
    toast.custom((t) => (
      <div className="bg-gray-800 border border-red-900 rounded-lg p-4 shadow-lg">
        <p className="text-gray-200 mb-4">Are you sure you want to reset all rules?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              resetRules();
              toast.success("All rules have been reset");
              toast.dismiss(t);
            }}
            className="px-3 py-1 bg-red-900 text-gray-200 rounded border border-red-700 hover:bg-red-800 hover:border-red-600 transition-colors duration-200"
          >
            Reset
          </button>
          <button
            onClick={() => toast.dismiss(t)}
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
    });
  };

  const handleSaveRule = (data: FilterRuleFormData) => {
    if (editingRule) {
      updateRule(editingRule.id, data);
      toast.success("Rule updated successfully");
    } else {
      addRule(data);
      toast.success("Rule added successfully");
    }
    setEditingRule(null);
    setIsAddingRule(false);
  };

  const handleDeleteRule = (id: string) => {
    deleteRule(id);
    toast.success("Rule deleted successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Toaster position="top-right" />
      <header className="bg-black border-b border-red-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/applogo.png"
                alt="MonkeFilter Logo"
                className="h-10 w-10 object-cover rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">LootFilter.tech</h1>
                <h2 className="text-sm text-gray-400">Filter Generator for Path of Exile 2</h2>
              </div>
            </div>
            <a
              href="/Tools"
              className="px-3 py-1.5 bg-red-900 text-gray-200 rounded border border-red-700 shadow-lg hover:bg-red-800 hover:border-red-600 transition-colors duration-200"
            >
              Community Tools
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              {!isAddingRule && !editingRule && (
                <div className="flex space-x-2">
                <button
                  onClick={() => setIsAddingRule(true)}
                  className="flex items-center space-x-1 px-3 py-1 bg-red-900 text-gray-200 rounded border border-red-700 shadow-lg hover:bg-red-800 hover:border-red-600 transition-colors duration-200"
                >
                  <Plus size={16} />
                  <span>Add Rule</span>
                </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-900 text-gray-200 rounded border border-red-700 shadow-lg hover:bg-red-800 hover:border-red-600 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                    <span>Reset</span>
                  </button>
                </div>
              )}
            </div>

            {(isAddingRule || editingRule) && (
              <RuleEditor
                initialData={editingRule || undefined}
                onSave={handleSaveRule}
                onCancel={() => {
                  setEditingRule(null);
                  setIsAddingRule(false);
                }}
              />
            )}

            <RuleList
              rules={rules}
              onReorder={reorderRules}
              onEdit={setEditingRule}
              onDelete={handleDeleteRule}
            />
          </div>

          <div>
            <FilterPreview rules={rules} />
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-red-900 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm gap-2">
          <span>© 2025 LootFilter.tech</span>
          <span><small>App is in beta - You may encounter bugs. This is a fan-made project and is not associated with Grinding Gear Games.</small></span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/r3cla/lootfilter"
              className="hover:text-gray-200 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              View source<Github className="inline ml-1" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
