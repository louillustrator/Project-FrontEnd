import haversine from 'haversine';
import { Location, Permissions, MapView } from "expo";

export const _haversine = (coordArray) => {
    if (coordArray.length > 1) {
        let metometer = 0;
        for (let i = 0; i < coordArray.length - 1; i++) {
            metometer += haversine(coordArray[i], coordArray[i + 1], { unit: 'meter' })
            //other measurements: 'km'(default), 'mile', 'nmi'
        }
        return metometer
    }
}

export const _watchPosition = function(val) {
    if(val === 0 && this.state.watching === true) {
        this.state.subscription.remove()
    } else if(val === 1 && this.state.watching === false)
    Permissions.askAsync(Permissions.LOCATION)
      .then(res => {
        if (res.status === "granted") {
          returnedPromise = Location.watchPositionAsync(
            {
              enableHighAccuracy: true,
              distanceInterval: 2,
              timeInterval: 2000
            },
            newLocation => {
              if (newLocation.timestamp) {
                let object = {
                  latitude: newLocation.coords.latitude,
                  longitude: newLocation.coords.longitude,
                  timestamp: newLocation.timestamp
                };
                let route = [...this.state.route]
                let currentObj = {...route[route.length -1]}
                let latLng = [...currentObj.latLng, object]
                currentObj.latLng = latLng
                route[route.length-1] = currentObj
                let subscription = returnedPromise._55
                this.setState({
                  route,
                  subscription
                });
              } else {
                console.log("ignored newLocation");
              }
            }
          );
        }
      })
      .catch(err => console.log("Error in componentDidMount: ", err.message));
  };

  export const _getLocationAsync = async function() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });

    return location;
  };