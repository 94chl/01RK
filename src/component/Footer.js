export default function Footer({ $target }) {
  const $header = document.createElement("div");
  $header.setAttribute("id", "footerBox");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
    <div>v0.42.0(21.09.29)</div>
    <div>Copyright and intellectual property rights regarding all games belong to "Nimble Neuron"corp</div>
    <div>created by BrownRoomFish</div>
    <div><a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F94chl.github.io%2F01RK%2F&count_bg=%23FFBB00&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a></div>
    `;
  };

  this.render();
}
