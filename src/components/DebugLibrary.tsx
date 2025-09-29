import { LIBRARY } from "../data/library";

export function DebugLibrary() {
  console.log("Library loaded:", LIBRARY);
  console.log("Number of packs:", LIBRARY.packs.length);
  
  LIBRARY.packs.forEach(pack => {
    console.log(`Pack: ${pack.id} (${pack.label})`);
    pack.subpacks.forEach(subpack => {
      console.log(`  Subpack: ${subpack.id} (${subpack.label}) - ${subpack.questions.length} questions`);
    });
  });

  return (
    <div className="bg-yellow-100 border border-yellow-400 p-4 m-4 rounded">
      <h3 className="font-bold">Library Debug Info:</h3>
      <p>Total Packs: {LIBRARY.packs.length}</p>
      <p>Total Questions: {LIBRARY.packs.reduce((total, pack) => 
        total + pack.subpacks.reduce((subTotal, subpack) => 
          subTotal + subpack.questions.length, 0), 0)}</p>
      
      <details className="mt-2">
        <summary className="cursor-pointer font-medium">Packs Structure</summary>
        <pre className="text-xs mt-2 overflow-auto max-h-40">
          {JSON.stringify(LIBRARY.packs.map(pack => ({
            id: pack.id,
            label: pack.label,
            subpacks: pack.subpacks.map(subpack => ({
              id: subpack.id,
              label: subpack.label,
              questionCount: subpack.questions.length
            }))
          })), null, 2)}
        </pre>
      </details>
    </div>
  );
}