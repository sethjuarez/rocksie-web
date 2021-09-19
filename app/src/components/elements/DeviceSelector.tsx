import React, { useState, useEffect, useRef } from 'react';

interface DeviceProps {
  onSelect(id: any): any 
}

export const DeviceSelector = ({onSelect}: DeviceProps) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const selectEl = useRef<HTMLSelectElement>(null)

  const selectDevice = () => {
    if(selectEl.current)
      onSelect(selectEl.current.value)
  } 
  
  useEffect(() => {
    (async () => {
      const items = await navigator.mediaDevices.enumerateDevices()
      const devices = items.filter(device => device.kind === 'videoinput')
      setDevices(devices)
    })()
  })

  return (
    <select ref={selectEl} title="Select Video Camera" onInput={selectDevice}>
      {devices.map(d => (<option key={d.deviceId} value={d.deviceId}>{d.label}</option>))}
    </select>
  )
}

export default DeviceSelector