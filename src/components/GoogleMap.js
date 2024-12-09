import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const initialCenter = {
    lat: 37.5665,
    lng: 126.978,
};

const libraries = ["places"];

const MapComponent = () => {
    const [mapCenter, setMapCenter] = useState(initialCenter);
    const [markerPosition, setMarkerPosition] = useState(initialCenter);
    const [address, setAddress] = useState("");
    const [clickedAddress, setClickedAddress] = useState("");

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAk1boHraafDoqXDL4WQjgIGt4arY45B5g",
        libraries,
    });

    const handleAddressSubmit = async () => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    address
                )}&key=AIzaSyAk1boHraafDoqXDL4WQjgIGt4arY45B5g`
            );
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setMapCenter(location);
                setMarkerPosition(location);
                setClickedAddress(data.results[0].formatted_address);
            } else {
                alert("주소를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error("Geocoding Error:", error);
            alert("주소를 변환하는 중 오류가 발생했습니다.");
        }
    };

    const handleMapClick = async (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setMarkerPosition({ lat, lng });

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAk1boHraafDoqXDL4WQjgIGt4arY45B5g`
            );
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
                setClickedAddress(data.results[0].formatted_address);
            } else {
                setClickedAddress("주소를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error("Reverse Geocoding Error:", error);
            setClickedAddress("주소를 가져오는 중 오류가 발생했습니다.");
        }
    };

    return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>🗺️구글 지도</h2>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="주소를 입력하세요"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: "300px", marginRight: "10px", padding: '5px' }}
                />
                <button onClick={handleAddressSubmit} style={{ padding: '5px 10px' }}>지도 표시</button>
            </div>

            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={12}
                    onClick={handleMapClick}
                >
                    <Marker position={markerPosition} />
                </GoogleMap>
            ) : loadError ? (
                <p>지도를 불러오는 중 오류가 발생했습니다.</p>
            ) : (
                <p>지도를 불러오는 중입니다...</p>
            )}

            {clickedAddress && (
                <p style={{ marginTop: "10px" }}>{` 📌클릭한 위치의 주소: ${clickedAddress}`}</p>
            )}
        </div>
    );
};

export default MapComponent;