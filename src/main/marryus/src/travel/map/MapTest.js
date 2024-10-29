import React, { useEffect } from 'react';

const MapTest = ({ coordinates,name}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB_aUn9bIccvAfLc5Ske6ovH0z9vWSntK0&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = function () {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: coordinates.lat, lng: coordinates.lng },
        zoom: 14,
        mapId: 'YOUR_MAP_ID', // 지도 ID 설정
      });

      // 마커 추가
      const marker = new window.google.maps.Marker({
        position: { lat: coordinates.lat, lng: coordinates.lng },
        map: map,
        title: '숙소 위치',
      });

      // InfoWindow 추가
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="text-align: center;">${name}</div>`,
      });

      // InfoWindow 열기
      infoWindow.open(map, marker);

      // 마우스 오버 시 InfoWindow 표시
      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });

      

    };
    

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [coordinates]);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapTest;
