document.addEventListener('DOMContentLoaded', function() {
    var request = indexedDB.open('MyDatabase', 2);  // Open the IndexedDB

    request.onerror = function(event) {
        console.error("IndexedDB error:", event.target.errorCode);
    };

    request.onsuccess = function(event) {
        var db = event.target.result;
        var tx = db.transaction('nicknames', 'readonly');
        var store = tx.objectStore('nicknames');
        var getRequest = store.get('userNickname');  // Get the 'userNickname' from the store

        getRequest.onsuccess = function() {
            var storedNickname = getRequest.result ? getRequest.result.nickname : '';
            var serverNickname = document.getElementById('serverNickname').textContent.trim();  // Read the server-side injected nickname

            var localNickname = storedNickname.trim();
            console.log("Local Nickname: ", localNickname);
            console.log("Server Nickname: ", serverNickname);

            if (localNickname !== serverNickname || localNickname === '') {
                console.log("should not display button");

            } else {

                console.log("should display button");
                var buttonContainer = document.getElementById('buttonContainer');
                var buttonHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#suggestNameModal">Choose Suggested Names</button>`;
                buttonContainer.innerHTML = buttonHTML;  // Insert the button into the container
            }

        };

        getRequest.onerror = function(event) {
            console.error('Error fetching nickname from IndexedDB:', event.target.errorCode);
        };

        tx.oncomplete = function() {
            db.close();  // Close the db when the transaction is done
        };
    };
});
