/**
 * Created by Y_Cwei on 2018/6/25.
 */
(function (desW) {
  var width = document.documentElement.clientWidth
  var styleNode = document.createElement('style')
  styleNode.innerHTML = 'html{font-size: ' + width / desW * 100 + 'px!important}'
  document.head.appendChild(styleNode)
})(750)
