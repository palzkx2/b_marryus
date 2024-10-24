import React, { useEffect } from 'react';

const MapTest = ({ coordinates }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB_aUn9bIccvAfLc5Ske6ovH0z9vWSntK0&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = function () {
      // 지도 ID가 필요합니다. 여기서 YOUR_MAP_ID를 실제 지도 ID로 바꿉니다.
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: coordinates.lat, lng: coordinates.lng },
        zoom: 12,
        // 아래에서 지도 ID를 설정합니다.
        mapId: 'YOUR_MAP_ID', // 추가: 지도 ID
      });

      // 고급 마커 사용
      const marker = new window.google.maps.Marker({
        position: { lat: coordinates.lat, lng: coordinates.lng },
        map: map,
        title: '숙소 위치',
      });
      

      // 마커의 속성 설정 (필요에 따라)
      marker.setMap(map);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [coordinates]);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapTest;
