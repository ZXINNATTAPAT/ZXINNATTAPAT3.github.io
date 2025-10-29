function downloadCV() {
    // Replace 'your_cv_filename.pdf' with the actual filename and extension
    var filename = 'Nattapat Phungphugdee.pdf';
    var element = document.createElement('a');
    element.setAttribute('href', './Photo/' + filename);
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}