document.addEventListener('DOMContentLoaded', function() {

  // listener for file upload
  fileInput.addEventListener('change', function() {
    var uploadedFile = fileInput.files[0];
    fileInfo.innerHTML = "";
    if (uploadedFile) {
        fileInfo.innerHTML += printFileInfo(uploadedFile.size, uploadedFile.type)
      if (['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].includes(uploadedFile.type)) {
        imgReader(fileInput)
      } else {
        container.classList.remove("active")
      }
    }
  })
  
  // listener for input button
  txtButton.addEventListener('click', function() {
    var url = txtInput.value;
    fileInfo.innerHTML = "";
    resp = fetch(url, {mode: "cors"}).then(function(data) {
      data.blob().then(function(image) {
        fileInfo.innerHTML += printFileInfo(image.size,image.type);
      })
    });
    if (url.match(/^http.*\.(jpeg|jpg|gif|png)$/) != null) {
      var img = new Image();
      img.onload = function () {
        fileInfo.innerHTML += printDimension(this.width, this.height);
        container.classList.add("active");
      };
  
      img.src = url;
      container.src = url;
    } else {
      container.classList.remove("active");
    }
  });


  // functions
  function imgReader(input) {
    var reader = new FileReader();
      
      reader.onload = function(e) {
        container.setAttribute('src', e.target.result)
        container.classList.add("active")    
      }
    
      var img = new Image();
      var _URL = window.URL || window.webkitURL;
      var objectUrl = _URL.createObjectURL(input.files[0]);

      img.onload = function () {
        fileInfo.innerHTML +=  printDimension(this.width, this.height);
        _URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
  
      reader.readAsDataURL(input.files[0]);
  }
  
  function getFileSize(fileSize) {
    if(fileSize.length < 7) return `${Math.round(+fileSize/1024).toFixed(2)}kb`
      return `${(Math.round(+fileSize/1024)/1000).toFixed(2)}MB`
  }

  // printing function

  function printFileInfo(size, type) {
    return  "<p> Size: "+getFileSize(size.toString())+"</p>" + "<p>Type: "+ type+"</p>"
  }

  function printDimension(width, height) {
    return "<p>Dimension: " + width + "X"+ height + "</p>"
  }
}, false);