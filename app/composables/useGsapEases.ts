let registered = false;

export function registerGsapEases() {
    if (registered || !import.meta.client) return;
    const CustomEase = useCustomEase();
    // cubic-bezier(x1,y1,x2,y2) -> M0,0 C{x1},{y1} {x2},{y2} 1,1
    CustomEase.create('ease01', 'M0,0 C0.27,0.76 0,1 1,1');  // バネぽいの
    CustomEase.create('ease02', 'M0,0 C0.22,1 0.36,1 1,1');   // 収束/弾性
    registered = true;
}
