// Propagate the selected theme to the independent 3D document.
(function(){
 function sync(){const theme=document.documentElement.dataset.theme||'dark';document.querySelectorAll('#inicio iframe').forEach(frame=>frame.contentWindow?.postMessage({type:'cedi-palette',theme},'*'));}
 document.querySelectorAll('#inicio iframe').forEach(frame=>frame.addEventListener('load',sync));
 new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});sync();
})();

const finalMap=document.querySelector(".footer-columns");if(finalMap){const foot=finalMap.closest("footer");if(foot)foot.append(finalMap);}
