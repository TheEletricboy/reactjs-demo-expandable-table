import { useFilterContext } from "../../contexts/FilterContext";

export const FilterSummary= () => {
  const { filters } = useFilterContext();
  return (
    <div style={{ marginBottom: '20px', fontSize: '14px', color: '#888', display: 'flex', gap: '3rem' }}>
      {Object.entries(filters).map(([dimension, selectedValues]) => (
        selectedValues.length > 0 && (
          <div key={dimension} style={{ marginBottom: '5px' }}>
            <strong>{dimension}:</strong> {selectedValues.join(', ')}
          </div>
        )
      ))}
    </div>
  );
};
