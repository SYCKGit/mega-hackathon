export function searchAnimation(algo) {
  return (cy, startNode, isDirected) => {
    const result = cy.elements()[algo](`#${startNode}`, () => {}, isDirected);
    let i = 0;
    const highlightNextEle = () => {
      if (i < result.path.length) {
        const ele = result.path[i];
        if (ele.isNode()) {
          ele.animate({
            style: { "background-color": "#03346E" },
            duration: 500
          });
        } else if (ele.isEdge()) {
          ele.animate({
            style: { "line-color": "#03346E", "target-arrow-color": "#03346E" },
            duration: 500
          });
        }
        i++;
        setTimeout(highlightNextEle, 1000);
      }
    }
    highlightNextEle();
  }
};