export default function Footer({ $target }) {
  const $header = document.createElement("div");
  $header.setAttribute("id", "footerBox");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
    <div>v0.42.0(21.09.29)</div>
    <div>Copyright and intellectual property rights regarding all games belong to "Nimble Neuron"
    corp</div>
    <div>created by BrownRoomFish</div>
    `;
  };

  this.render();
}
