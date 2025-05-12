export function LowStockAlert() {
  const lowStockItems = [
    {
      id: "1",
      name: "Nike Air Max 270",
      sku: "NKE-AM270-42",
      currentStock: 12,
      minStock: 20,
      reorderPoint: 15,
    },
    {
      id: "2",
      name: "Samsung 65\" QLED TV",
      sku: "SAM-TV65-QLED",
      currentStock: 5,
      minStock: 10,
      reorderPoint: 7,
    },
    {
      id: "3",
      name: "Apple AirPods Pro",
      sku: "AP-AIRPODS-PRO",
      currentStock: 8,
      minStock: 25,
      reorderPoint: 15,
    },
    {
      id: "4",
      name: "Lenovo ThinkPad X1",
      sku: "LEN-TP-X1",
      currentStock: 3,
      minStock: 10,
      reorderPoint: 5,
    },
  ];

  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div 
          key={item.id} 
          className="flex items-start space-x-3 border-b border-border pb-3 last:border-0 last:pb-0"
        >
          <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 font-semibold text-sm">
            {item.currentStock}
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">{item.name}</h4>
            <div className="text-xs text-muted-foreground">SKU: {item.sku}</div>
            <div className="text-xs">
              <span className="text-red-600 dark:text-red-400 font-medium">Reorder now! </span> 
              <span className="text-muted-foreground">
                (Min: {item.minStock} | Reorder point: {item.reorderPoint})
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}