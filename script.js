const games = [
  {
    title:"Cyberpunk 2077", genre:"RPG • Ação", release:"10 dez. 2020", size:"~70 GB",
    platform:"PC", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    summary:"RPG de mundo aberto ambientado em Night City, com exploração, combate e uma história focada em escolhas.",
    req:"64-bit, Windows 10, Intel Core i7-6700 ou Ryzen 5 1600, 12 GB RAM, GTX 1060 6 GB ou RX 580 8 GB, DirectX 12.",
    link:"https://store.steampowered.com/app/1091500/Cyberpunk_2077/"
  },
  {
    title:"The Witcher 3: Wild Hunt", genre:"RPG • Mundo aberto", release:"18 mai. 2015", size:"~50 GB",
    platform:"PC", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    summary:"Aventura de fantasia em mundo aberto na pele de Geralt de Rívia, com exploração, missões e combates.",
    req:"64-bit, Windows 7/8/10, Intel Core i5-2500K ou AMD Phenom II X4 940, 6 GB RAM, GTX 660 ou Radeon HD 7870, DirectX 11.",
    link:"https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/"
  },
  {
    title:"Grand Theft Auto V", genre:"Ação • Mundo aberto", release:"14 abr. 2015", size:"~110 GB",
    platform:"PC", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
    summary:"Explore Los Santos em uma aventura de ação em mundo aberto com campanha, personagens e atividades variadas.",
    req:"Windows 10, Intel Core 2 Quad Q6600 ou AMD Phenom 9850, 4 GB RAM, NVIDIA 9800 GT 1 GB ou AMD HD 4870 1 GB, DirectX 10.",
    link:"https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/"
  },
  {
    title:"Red Dead Redemption 2", genre:"Ação • Aventura", release:"5 dez. 2019", size:"~150 GB",
    platform:"PC", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    summary:"Uma grande aventura de faroeste em um mundo aberto, acompanhando Arthur Morgan e a gangue Van der Linde.",
    req:"Windows 10, Intel Core i5-2500K ou AMD FX-6300, 8 GB RAM, GTX 770 2 GB ou R9 280 3 GB, DirectX 12.",
    link:"https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/"
  },
  {
    title:"Hades", genre:"Roguelike • Ação", release:"17 set. 2020", size:"~15 GB",
    platform:"PC", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    summary:"Lute para escapar do submundo em combates rápidos, combinando poderes diferentes em cada tentativa.",
    req:"Windows 7 SP1, Dual Core 2.4 GHz, 4 GB RAM, 1 GB de memória gráfica, DirectX 10.",
    link:"https://store.steampowered.com/app/1145360/Hades/"
  },
  {
    title:"Stardew Valley", genre:"Simulação • RPG", release:"26 fev. 2016", size:"~500 MB",
    platform:"PC", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
    summary:"Assuma uma antiga fazenda e construa sua nova vida cultivando, pescando, explorando e conhecendo a comunidade.",
    req:"Windows Vista ou superior, processador de 2 GHz, 2 GB RAM, 256 MB de memória gráfica e 500 MB de espaço.",
    link:"https://store.steampowered.com/app/413150/Stardew_Valley/"
  }
];

const grid = document.getElementById("grid"), empty = document.getElementById("empty"), search = document.getElementById("search");
const modal = document.getElementById("modal");

function render(list){
  grid.innerHTML = "";
  empty.hidden = list.length !== 0;
  list.forEach((g,i)=>{
    const card = document.createElement("article");
    card.className="card";
    card.innerHTML=`
      <img class="cover" src="${g.image}" alt="Capa de ${g.title}" loading="lazy">
      <div class="card-body">
        <h3>${g.title}</h3>
        <div class="meta">${g.genre} · ${g.release}</div>
        <p class="summary">${g.summary}</p>
        <div class="card-actions">
          <button class="details" data-index="${i}">Detalhes</button>
          <a class="store" href="${g.link}" target="_blank" rel="noopener noreferrer">Loja oficial ↗</a>
        </div>
      </div>`;
    card.querySelector(".details").onclick=()=>openModal(g);
    grid.appendChild(card);
  });
}
function openModal(g){
  document.getElementById("modalImg").src=g.image;
  document.getElementById("modalImg").alt="Capa de "+g.title;
  document.getElementById("modalGenre").textContent=g.genre;
  document.getElementById("modalTitle").textContent=g.title;
  document.getElementById("modalSummary").textContent=g.summary;
  document.getElementById("modalRelease").textContent=g.release;
  document.getElementById("modalSize").textContent=g.size;
  document.getElementById("modalPlatform").textContent=g.platform;
  document.getElementById("modalReq").textContent=g.req;
  document.getElementById("modalLink").href=g.link;
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.getElementById("close").onclick=closeModal;
modal.onclick=e=>{if(e.target===modal)closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
search.oninput=()=>{
  const q=search.value.toLowerCase().trim();
  render(games.filter(g=>(g.title+" "+g.genre+" "+g.summary).toLowerCase().includes(q)));
};
render(games);
