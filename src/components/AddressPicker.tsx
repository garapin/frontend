import React, {useState} from "react";
import {useLoadScript, Autocomplete} from "@react-google-maps/api";
import {TextField} from "@mui/material";
import PlaceResult = google.maps.places.PlaceResult;

interface LocationInputProps {
    onLocationSelect: (place: PlaceResult) => void;
    label: string
}

const AddressPicker: React.FC<LocationInputProps> = ({onLocationSelect, label}) => {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();

    const libraries: ("places")[] = ["places"];
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyBd4sCVzZ0ixw4Jxqsn10yIPJF5eFEADdA",
        libraries,
    });

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
        setAutocomplete(autocomplete);
    };

    const onPlaceChanged = () => {
        if (autocomplete?.getPlace()) {
            const place = autocomplete.getPlace();
            if (place) {
                onLocationSelect(place);
            }
        }
    };

    if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <TextField fullWidth label={label ? label : 'Alamat Perusahaan/Pengiriman (opsional)'} placeholder="Type location..."
                       inputProps={{autoComplete: "off"}}/>
        </Autocomplete>
    );
};

export default AddressPicker
