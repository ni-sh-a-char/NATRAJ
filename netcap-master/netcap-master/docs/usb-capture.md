---
description: Capture traffic sent via Universal Serial Bus (USB) protocol
---

# USB Capture

## Live Capture

USB live capture is now possible, currently the following Audit Records exist: USB and USBRequestBlockSetup.

To capture USB traffic live on macOS, install wireshark and bring up the USB interface:

```text
$ sudo ifconfig XHC20 up
```

Now attach netcap and set baselayer to USB:

```text
$ net.cap -iface XHC20 -base usb
```

## Offline from dumpfile

To read offline USB traffic from a PCAP file use:

```text
$ net.cap -r usb.pcap -base usb
```

Don't forget to set the **-payload** flag if you want to preserve the data being transmitted!

## Audit Records

The **USB** and **USBRequestBlockSetup** audit records contain the following fields:

```erlang
message USB {
    string      Timestamp                 = 1;
    uint64      ID                        = 2;
    int32       EventType                 = 3;
    int32       TransferType              = 4;           
    int32       Direction                 = 5;           
    int32       EndpointNumber            = 6;
    int32       DeviceAddress             = 7;
    int32       BusID                     = 8; 
    int64       TimestampSec              = 9; 
    int32       TimestampUsec             = 10;
    bool        Setup                     = 11;
    bool        Data                      = 12;
    int32       Status                    = 13;
    uint32      UrbLength                 = 14;
    uint32      UrbDataLength             = 15;
    uint32      UrbInterval               = 16;
    uint32      UrbStartFrame             = 17;
    uint32      UrbCopyOfTransferFlags    = 18;
    uint32      IsoNumDesc                = 19;
    bytes       Payload                   = 20;
}

message USBRequestBlockSetup {
    string Timestamp   = 1; 
    int32  RequestType = 2;
    int32  Request     = 3;
    int32  Value       = 4;
    int32  Index       = 5;
    int32  Length      = 6;
}
```

 

