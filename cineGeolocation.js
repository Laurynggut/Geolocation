 var LatLong = function (city,latitude,longitude){
         this.city = city;
         this.latitude = latitude;
         this.longitude = longitude
 };   

//var coords = JSON.parse(localStorage.getItem("coords"))
var locations = [
            ['Cine Verdi', 40.437012, -3.703917],
            ["Me", 40.462790, -3.688944]
            
        ];


    $(document).ready(function(){    
        $("#submit").click(function(event){ //submit nos referimos al boton guardar 
           event.preventDefault();// con esto conseguimos que no se recargue la página
            //Captura de datos escrito en los inputs        
            var city = $("#place").val();
            var latitude = $("#latitude").val();
            var longitude = $("#longitude").val();
            var position = new LatLong (city, latitude, longitude);

            //Guardando los datos en el LocalStorage
            //localStorage.setItem("Longitud", longitude);
            
            //Limpiando los campos o inputs
            $("#place").val("");
            $("#latitude").val("");
            $("#longitude").val(""); 
            locations.push(position);
            localStorage.setItem("position",JSON.stringify(position));
            // localStorage.setItem("LatLong", value);         
            console.log(locations)

            var infowindow = new google.maps.InfoWindow();
            var marker, i;

            for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
            map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
            infowindow.setContent(locations[i].city);
            infowindow.open(map, marker);
            }
            })(marker, i));
          };  
        });



    var map = new google.maps.Map(document.getElementById("map"),{ 
                zoom: 10,
                center: new google.maps.LatLng(40.420380, -3.705808),
                mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        var infowindow = new google.maps.InfoWindow();
        var marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
            }
            })(marker, i));
        };
    });