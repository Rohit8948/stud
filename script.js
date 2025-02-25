document.getElementById('studentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Store student data
  const studentData = {
    fullName: document.getElementById('fullName').value,
    dob: document.getElementById('dob').value,
    gender: document.getElementById('gender').value,
    contactNumber: document.getElementById('contactNumber').value,
    emailAddress: document.getElementById('emailAddress').value,
    address: document.getElementById('address').value,
    parentName: document.getElementById('parentName').value,
    relationship: document.getElementById('relationship').value,
    parentContact: document.getElementById('parentContact').value,
    parentEmail: document.getElementById('parentEmail').value,
    schoolName: document.getElementById('schoolName').value,
    currentClass: document.getElementById('currentClass').value,
    academicPerformance: document.getElementById('academicPerformance').value
  };

  localStorage.setItem('studentData', JSON.stringify(studentData));

  // Store document uploads as Data URLs
  const documentFiles = [
    { id: 'birthCertificate', name: 'Birth Certificate' },
    { id: 'reportCards', name: 'Report Cards' },
    { id: 'transferCertificate', name: 'Transfer Certificate' },
    { id: 'otherDocs', name: 'Other Documents' }
  ];

  const documents = {};
  let filesProcessed = 0;

  documentFiles.forEach((doc) => {
    const file = document.getElementById(doc.id).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        documents[doc.name] = e.target.result; // Store Data URL
        filesProcessed++;
        if (filesProcessed === documentFiles.length) saveDocuments();
      };
      reader.readAsDataURL(file);
    } else {
      documents[doc.name] = null;
      filesProcessed++;
      if (filesProcessed === documentFiles.length) saveDocuments();
    }
  });

  function saveDocuments() {
    localStorage.setItem('documents', JSON.stringify(documents));

    // Save profile picture
    const profilePicFile = document.getElementById('profilePic').files[0];
    if (profilePicFile) {
      const reader = new FileReader();
      reader.onload = function () {
        localStorage.setItem('profilePic', reader.result);
        alert('Student data and profile picture saved successfully!');
        window.location.href = 'view.html';
      };
      reader.readAsDataURL(profilePicFile);
    } else {
      alert('Student data saved without profile picture!');
      window.location.href = 'view.html';
    }
  }
});
