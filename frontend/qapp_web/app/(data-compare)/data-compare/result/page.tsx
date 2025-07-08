"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { GoHome } from "@/components/ui/custom-ui/GoHome";

const allMetrics = [
  { key: "totalCount", label: "Total Count" },
  { key: "fillRate", label: "Fill Rate (%)" },
  { key: "changePct", label: "Increase/Decrease (%)" },
  { key: "missingValues", label: "Missing Values" },
];

export default function ResultPage() {
  const searchParams = useSearchParams();

  // Extract filenames and base file index from query
  const filenames: string[] = [];
  for (let i = 0; i < 10; i++) {
    const file = searchParams.get(`file${i}`);
    if (file) filenames.push(file);
  }
  const baseFileIndex = Number(searchParams.get("base")) || 0;

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const onMetricToggle = (metricKey: string) => {
    setSelectedMetrics((current) =>
      current.includes(metricKey)
        ? current.filter((m) => m !== metricKey)
        : [...current, metricKey]
    );
  };

  const generateDummyValue = (file: string, metric: string) => {
    switch (metric) {
      case "totalCount":
        return Math.floor(Math.random() * 1000 + 100);
      case "fillRate":
        return (Math.random() * 100).toFixed(1) + "%";
      case "changePct":
        return (Math.random() * 20 - 10).toFixed(1) + "%";
      case "missingValues":
        return Math.floor(Math.random() * 50);
      default:
        return "-";
    }
  };

  return (
    <>
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Comparison Metrics</h1>

      {/* Dropdown to select metrics */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            📊 Select Metrics
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Metrics to Show</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {allMetrics.map((metric) => (
            <DropdownMenuCheckboxItem
              key={metric.key}
              checked={selectedMetrics.includes(metric.key)}
              onCheckedChange={() => onMetricToggle(metric.key)}
            >
              {metric.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dynamic Table */}
      {selectedMetrics.length === 0 ? (
        <p className="text-gray-500 mt-4">Select metrics to display the table.</p>
      ) : (
        <table className="w-full border border-gray-300 border-collapse mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Filename</th>
              {selectedMetrics.map((metricKey) => {
                const metric = allMetrics.find((m) => m.key === metricKey);
                return (
                  <th
                    key={metricKey}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    {metric?.label}
                  </th>
                );
              })}
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filenames.map((file, idx) => (
              <tr
                key={file}
                className={`hover:bg-gray-50 ${
                  idx === baseFileIndex ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                <td className="border border-gray-300 px-4 py-2">{file}</td>
                {selectedMetrics.map((metricKey) => (
                  <td key={metricKey} className="border border-gray-300 px-4 py-2">
                    {generateDummyValue(file, metricKey)}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `/data-compare/dtale?file=${encodeURIComponent(file)}`,
                        "_blank"
                      )
                    }
                  >
                    Open in D-Tale
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
     <GoHome isProcessing={true} position="footer" />
    </>
  );
}
