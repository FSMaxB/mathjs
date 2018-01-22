'use strict';

(function() {
  var parenthesis = 'keep';
  var implicit = 'hide';

  function render() {
    var node = null;
    var expression = $('#expr')[0].value;
    var resultDisplay = $('#result')[0];

    try {
      node = math.parse(expression);

      // evaluate the result of the expression
      resultDisplay.innerHTML = math.format(node.compile().eval());
    }
    catch (exception) {
      resultDisplay.innerHTML = '<span style="color: red;">' + exception.toString() + '</span>';
    }

    try {
      // export the expression to LaTeX
        var latex = node ? '\\[' + node.toTex({parenthesis: parenthesis, implicit: implicit}) + '\\]' : '\\[\\]';
      console.log('LaTeX expression:', latex);

      // display and re-render the expression
      var latexDisplay = $('#pretty')[0];
      latexDisplay.innerHTML = latex;
      MathJax.Hub.Typeset(latexDisplay);
    }
    catch (exception) {}
  }

  $().ready(function () {
    render();

    // callback setup
    $('#expr').on('input', render);

    $('input[type=radio][name=parenthesis]').change(function () {
      parenthesis = this.value;
      render();
    });

    $('input[type=radio][name=implicit]').change(function () {
      implicit = this.value;
      render();
    });
  });
})();
