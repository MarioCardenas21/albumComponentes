// ========= Utilidad: placeholder SVG para cuando falte imagen =========
function placeholderSVG(label, bg) {
  const svg = `<?xml version='1.0'?><svg xmlns='http://www.w3.org/2000/svg' width='320' height='200' viewBox='0 0 320 200'>
  <defs><linearGradient id='g' x1='0' x2='1'>
    <stop offset='0%' stop-color='${bg}' /><stop offset='100%' stop-color='#1e293b' />
  </linearGradient></defs>
  <rect width='100%' height='100%' rx='18' fill='url(%23g)' />
  <g font-family='Segoe UI, Roboto, Arial' fill='white' text-anchor='middle'>
    <text x='160' y='105' font-size='48' font-weight='700' opacity='.95'>${label}</text>
  </g></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const ICONS = {
  CPU:           placeholderSVG('CPU','#2563eb'),
  GPU:           placeholderSVG('GPU','#7c3aed'),
  RAM:           placeholderSVG('RAM','#059669'),
  Motherboard:   placeholderSVG('MB','#0ea5e9'),
  Almacenamiento:placeholderSVG('SSD','#ca8a04'),
  Fuente:        placeholderSVG('PSU','#dc2626'),
  Gabinete:      placeholderSVG('CASE','#6b7280'),
  Refrigeración: placeholderSVG('COOL','#14b8a6'),
};

// ========= Datos de ejemplo (ilustrativos, sin precios) =========
// Reemplaza las rutas "img/..." por tus archivos reales en la carpeta img/
const DEMO = [
  { id:1, name:'Ryzen 5 5600', brand:'AMD', model:'100-100000927BOX', category:'CPU', rating:4.7,
    specs:['6 núcleos','12 hilos','4.4GHz Boost'],
    desc:'Rendimiento sólido para gaming y tareas generales.',
    image:'img/cpu/ryzen5600.png' },



    
  { id:2, name:'Core i5-12400F', brand:'Intel', model:'BX8071512400F', category:'CPU', rating:4.6,
    specs:['6 núcleos','12 hilos','Turbo 4.4GHz'],
    desc:'Eficiente para builds de gama media.',
    image:'img/cpu/i5-12400f.png' },

  { id:3, name:'GeForce RTX 3060', brand:'NVIDIA', model:'12GB GDDR6', category:'GPU', rating:4.5,
    specs:['3584 CUDA','12GB','HDMI/DP'], desc:'Popular para 1080p/1440p.',
    image:'img/gpu/rtx3060.png' },
  { id:4, name:'Radeon RX 6600', brand:'AMD', model:'8GB GDDR6', category:'GPU', rating:4.4,
    specs:['8GB','RDNA2','PCIe 4.0'], desc:'1080p con bajo consumo.',
    image:'img/gpu/rx6600.png' },

  { id:5, name:'Vengeance LPX 16GB', brand:'Corsair', model:'2x8GB 3200', category:'RAM', rating:4.8,
    specs:['DDR4 3200','CL16'], desc:'Confiable y bajo perfil.',
    image:'img/ram/vengeance-lpx-16gb.png' },
  { id:6, name:'Ripjaws S5 32GB', brand:'G.SKILL', model:'2x16GB 6000', category:'RAM', rating:4.9,
    specs:['DDR5 6000','CL36'], desc:'Rápida para plataformas modernas.',
    image:'img/ram/ripjaws-s5-32gb.png' },

  { id:7, name:'B550M-Plus', brand:'ASUS', model:'TUF Gaming', category:'Motherboard', rating:4.6,
    specs:['AM4','mATX','PCIe 4.0'], desc:'VRMs y puertos sólidos.',
    image:'img/motherboard/asus-b550m-plus.png' },
  { id:8, name:'B660M DS3H AX', brand:'Gigabyte', model:'DDR4', category:'Motherboard', rating:4.4,
    specs:['LGA1700','Wi‑Fi 6','mATX'], desc:'Base para 12ª/13ª gen.',
    image:'img/motherboard/giga-b660m-ds3h-ax.png' },

  { id:9, name:'970 EVO Plus 1TB', brand:'Samsung', model:'MZ-V7S1T0B', category:'Almacenamiento', rating:4.9,
    specs:['NVMe','3500/3300MB/s'], desc:'Rápido y confiable.',
    image:'img/almacenamiento/970-evo-plus-1tb.png' },
  { id:10, name:'MX500 1TB', brand:'Crucial', model:'CT1000MX500SSD1', category:'Almacenamiento', rating:4.8,
    specs:['SATA 2.5"','Lectura 560MB/s'], desc:'Excelente SSD SATA.',
    image:'img/almacenamiento/mx500-1tb.png' },

  { id:11, name:'CV650 80+ Bronze', brand:'Corsair', model:'CP-9020236', category:'Fuente', rating:4.5,
    specs:['650W','80+ Bronze'], desc:'Para builds de entrada.',
    image:'img/fuente/cv650.png' },
  { id:12, name:'Montech X3 Mesh', brand:'Montech', model:'ATX', category:'Gabinete', rating:4.4,
    specs:['3x ARGB front','ATX'], desc:'Alto flujo de aire.',
    image:'img/gabinete/montech-x3-mesh.png' },
  { id:13, name:'Hyper 212 Black', brand:'Cooler Master', model:'RR-212S-20PK', category:'Refrigeración', rating:4.7,
    specs:['120mm','Torre'], desc:'Clásico y eficiente.',
    image:'img/refrigeracion/hyper-212-black.png' },

    { id:14, name:'Case 5 5600', brand:'AMD', model:'100-100000927BOX', category:'CPU', rating:4.7,
    specs:['6 núcleos','12 hilos','4.4GHz Boost'],
    desc:'Rendimiento sólido para gaming y tareas generales.',
    image:'img/case.jpg' },

];

// ========= Estado =========
let DATA = [...DEMO];
let sortAsc = true;

function fillCategories(){
  const cats = [...new Set(DATA.map(x=>x.category))].sort();
  const sel = document.getElementById('cat');
  const current = sel.value;
  sel.innerHTML = '<option value="">Todas las categorías</option>' + cats.map(c=>`<option>${c}</option>`).join('');
  if ([...sel.options].some(o=>o.value===current)) sel.value=current;
}

function stars(n){
  const full = '★'.repeat(Math.floor(n));
  const empty = '☆'.repeat(5-Math.floor(n));
  return `<span title="${n?.toFixed ? n.toFixed(1) : n} / 5">${full}${empty}</span>`;
}

function imgFallback(img){
  const cat = img.dataset.category || 'CPU';
  img.onerror = null; // evitar loops
  img.src = ICONS[cat] || placeholderSVG('IMG','#444');
}

function card(x){
  const meta = [x.brand, x.model, x.category].filter(Boolean).map(v=>`<span class="pill">${v}</span>`).join('');
  const spec = (x.specs||[]).slice(0,3).map(s=>`<span class="pill">${s}</span>`).join('');
  return `
    <article class="card">
      <div class="thumb">
        <img src="${x.image||''}" alt="${x.category}" loading="lazy" data-category="${x.category}" onerror="imgFallback(this)">
      </div>
      <div class="content">
        <div class="name">${x.name}</div>
        <div class="meta">${meta}</div>
        <div class="meta">${spec}</div>
        <div class="actions">
          <button class="btn ghost" onclick='openDetail(${JSON.stringify(x.id)})'>Detalles ${stars(x.rating||4.5)}</button>
        </div>
      </div>
    </article>`;
}

function render(){
  const q = document.getElementById('q').value.trim().toLowerCase();
  const cat = document.getElementById('cat').value;
  let items = [...DATA];
  if (q){ items = items.filter(x => [x.name,x.brand,x.model,x.category].join(' ').toLowerCase().includes(q)); }
  if (cat){ items = items.filter(x => x.category===cat); }
  items.sort((a,b)=> sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  const grid = document.getElementById('grid');
  if (!items.length){
    grid.innerHTML = `<div style="opacity:.7;padding:30px;text-align:center;border:1px dashed rgba(255,255,255,.2);border-radius:14px">Sin resultados. Intenta limpiar filtros.</div>`;
    return;
  }
  grid.innerHTML = items.map(card).join('');
}

function openDetail(id){
  const item = DATA.find(d=>d.id===id);
  if(!item) return;
  const m = document.getElementById('modal');
  const img = document.getElementById('mImg');
  img.src = item.image || '';
  img.dataset.category = item.category;
  img.onerror = () => imgFallback(img);
  document.getElementById('mName').textContent = item.name;
  document.getElementById('mDesc').textContent = item.desc || '';
  document.getElementById('mMeta').innerHTML = [item.brand,item.model,item.category,...(item.specs||[])]
    .filter(Boolean).map(v=>`<span class="pill">${v}</span>`).join('');
  m.showModal();
}

// ========= Eventos UI =========
document.getElementById('q').addEventListener('input', render);
document.getElementById('cat').addEventListener('change', render);
document.getElementById('sort').addEventListener('click', e=>{
  sortAsc = !sortAsc; e.target.textContent = `Ordenar: Nombre ${sortAsc? 'A→Z':'Z→A'}`; render();
});
document.getElementById('addDemo').addEventListener('click', ()=>{ DATA=[...DEMO]; fillCategories(); render(); });

// ========= Init =========
fillCategories();
render();
