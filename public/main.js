const emotionPatterns = document.querySelectorAll(".emotionPatterns");
var trash = document.getElementsByClassName("fa-trash");

Array.from(emotionPatterns).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.childNodes[1].innerText
        const emotion = this.parentNode.childNodes[3].innerText
        const entry = this.parentNode.childNodes[5].innerText
        fetch('update', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'date': date,
            'emotion': emotion,
            'entry': entry,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
    });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        const emotion = this.parentNode.parentNode.parentNode.childNodes[3].innerText
        const entry = this.parentNode.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': date,
            'emotion': emotion,
            'entry': entry
          })
        }).then(function (response) {
          window.location.reload()
        })
    });
});
