/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useMemo, ChangeEvent, FC } from "react";
import { programs, categoryInfo } from "@/data/programs";
import {
  Download,
  Search,
  X,
  Sparkles,
  Check,
} from "lucide-react";
import { App, ProgramCategory, InstallMethod, Programs } from "@/types";
import { ScriptGenerator } from "@/utils/scriptGenerator";
import { Logo } from "@/components/Logo";

const Home: FC = () => {
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleApp = (appId: string): void => {
    setSelectedAppIds((prev) =>
      prev.includes(appId)
        ? prev.filter((id) => id !== appId)
        : [...prev, appId]
    );
  };

  const selectAll = (): void => {
    const allApps: string[] = [];
    Object.values(programs).forEach((category) => {
      category.forEach((app) => allApps.push(app.id));
    });
    setSelectedAppIds(allApps);
  };

  const deselectAll = (): void => {
    setSelectedAppIds([]);
  };

  const getSelectedApps = (): App[] => {
    const selectedApps: App[] = [];
    Object.values(programs).forEach((category) => {
      category.forEach((app) => {
        if (selectedAppIds.includes(app.id)) {
          selectedApps.push(app);
        }
      });
    });
    return selectedApps;
  };

  const downloadScript = (): void => {
    if (selectedAppIds.length === 0) {
      alert("Please select at least one application!");
      return;
    }

    const selectedApps = getSelectedApps();
    const generator = new ScriptGenerator(selectedApps, "auto");
    const script = generator.generate();

    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "install-apps.bat";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredPrograms = useMemo((): Programs => {
    if (!searchQuery) return programs;

    const filtered: Partial<Programs> = {};

    (Object.entries(programs) as [ProgramCategory, App[]][]).forEach(
      ([category, apps]) => {
        const filteredApps = apps.filter((app) =>
          app.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredApps.length > 0) {
          filtered[category] = filteredApps;
        }
      }
    );

    return filtered as Programs;
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2000ms" }}
        ></div>
      </div>

      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <Logo size="md" showText={true} />
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search
                className="absolute left-5 top-4 text-gray-400"
                size={15}
              />
              <input
                type="text"
                placeholder="Search for any application..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full pl-14 pr-14 py-2 bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700 rounded-2xl focus:border-purple-500 focus:outline-none text-gray-200 placeholder-gray-500 text-lg font-medium transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-4 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={selectAll}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Select All
              </button>
              <button
                onClick={deselectAll}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-xl font-semibold hover:bg-gray-700/50 transition-all border border-gray-700/50"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 py-10 pb-40">
        {Object.keys(filteredPrograms).length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-3xl text-gray-400 font-bold">No apps found</p>
            <p className="text-gray-500 mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(
              Object.entries(filteredPrograms) as [ProgramCategory, App[]][]
            ).map(([category, apps]) => (
              <CategoryCard
                key={category}
                category={category}
                apps={apps}
                selectedAppIds={selectedAppIds}
                toggleApp={toggleApp}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 p-1 px-6 z-50 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-baseline gap-2">
              <span className="text-gray-300 font-medium">Selected:</span>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {selectedAppIds.length}
              </span>
              <span className="text-gray-400 text-sm">apps</span>
            </div>
            {selectedAppIds.length > 0 && (
              <button
                onClick={deselectAll}
                className="text-sm text-pink-400 hover:text-pink-300 font-semibold transition-colors"
              >
                Clear Selection
              </button>
            )}
          </div>
          <button
            onClick={downloadScript}
            disabled={selectedAppIds.length === 0}
            className="relative flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100 overflow-hidden group shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <Download size={20} />
            <span className="relative z-10">Generate Installer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

interface CategoryCardProps {
  category: ProgramCategory;
  apps: App[];
  selectedAppIds: string[];
  toggleApp: (appId: string) => void;
}

const CategoryCard: FC<CategoryCardProps> = ({
  category,
  apps,
  selectedAppIds,
  toggleApp,
}) => {
  const info = categoryInfo[category];

  return (
    <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden hover:border-gray-600 transition-all transform hover:scale-[1.02] hover:shadow-2xl">
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/50 p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="text-2xl transform hover:scale-110 transition-transform">
            {info.icon}
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-100">{info.title}</h2>
            <p className="text-gray-400 text-xs font-medium">
              {info.description}
            </p>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
        {apps.map((app) => (
          <AppItem
            key={app.id}
            app={app}
            isSelected={selectedAppIds.includes(app.id)}
            onToggle={() => toggleApp(app.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface AppItemProps {
  app: App;
  isSelected: boolean;
  onToggle: () => void;
}

const AppItem: FC<AppItemProps> = ({ app, isSelected, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`group relative p-1 px-4 rounded-2xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] ${
        isSelected
          ? "border-purple-500 bg-gradient-to-r from-purple-900/30 to-pink-900/30 shadow-lg shadow-purple-500/20"
          : "border-gray-700/50 bg-gray-800/20 hover:border-gray-600 hover:bg-gray-800/30"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`relative flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all ${
            isSelected
              ? "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500"
              : "border-gray-600 bg-gray-800/50"
          }`}
        >
          {isSelected && (
            <Check className="absolute inset-0 m-auto text-white" size={12} />
          )}
        </div>
        <div className="w-10 h-10 flex items-center justify-center transform group-hover:scale-110 transition-transform">
          {app.icon.startsWith("http") ? (
            <img
              src={app.icon}
              alt={app.name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='50' font-size='50'%3E📦%3C/text%3E%3C/svg%3E";
              }}
            />
          ) : (
            <span className="text-3xl">{app.icon}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-200 truncate">{app.name}</div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {app.winget && (
              <span className="text-xs bg-green-900/30 text-green-400 px-1 py-0.5 rounded-lg font-semibold border border-green-700/50">
                Winget
              </span>
            )}
            {app.choco && (
              <span className="text-xs bg-blue-900/30 text-blue-400 px-1 py-0.5 rounded-lg font-semibold border border-blue-700/50">
                Choco
              </span>
            )}
            {app.directUrl && (
              <span className="text-xs bg-purple-900/30 text-purple-400 px-1 py-0.5 rounded-lg font-semibold border border-purple-700/50">
                Direct
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
