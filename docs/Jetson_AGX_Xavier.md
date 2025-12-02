---
layout: project
title: "Jetson AGX Xavier (X221D Carrier Board) 설치 및 설정 가이드"
year: "2025"
permalink: /docs/Jetson_AGX_Xavier/
---

# Jetson AGX Xavier (X221D Carrier Board) 설치 및 설정 가이드

본 문서는 **Jetson AGX Xavier (32GB)** 모듈과 **X221D Carrier Board**를 사용하여 개발 환경을 구축하는 방법을 설명합니다. 호환성을 위해 **JetPack 5.1.2** 버전을 사용하며, Windows의 WSL(Ubuntu 18.04) 환경에서 설치를 진행합니다.

## 1\. 하드웨어 준비 및 연결

### 1.1 하드웨어 사양

{% include project-media.html
    type="image"
    src="jetson_component.png"
    caption="구성품"
    size="medium"    
%}


  * **Module**: Jetson AGX Xavier (32GB)
  * **Carrier Board**: Auvidea X221D 
  * **Storage**: NVMe M.2 SSD (PCIe x4 2280) 호환 

### 1.2 연결

1.  SSD 및 하드웨어 구성 요소를 조립합니다.
2.  전원, 이더넷, USB 등을 연결합니다.
3.  **USB-C 포트**를 사용하여 Host PC와 Jetson을 연결합니다.
{% include project-media.html
    type="image"
    src="jetson_connect_pc.png"
    caption="PC 연결법"
    size="medium"    
%}


-----

## 2\. Host PC 환경 설정 (Windows WSL)

Windows 환경에서 WSL을 이용해 SDK Manager를 구동합니다.

### 2.1 WSL (Ubuntu 18.04) 설치 및 기본 설정

1.  Microsoft Store에서 **Ubuntu 18.04 LTS** 버전을 다운로드하여 실행합니다.
2.  Username과 Password를 설정합니다.
3.  필수 패키지를 설치합니다.
    ```bash
    sudo apt update
    sudo apt upgrade -y
    sudo apt install firefox x11-apps nautilus -y
    ```


### 2.2 NVIDIA SDK Manager 설치

1.  터미널에서 `firefox`를 실행하여 브라우저를 엽니다.
2.  NVIDIA SDK Manager를 검색하여 `.deb` 파일을 다운로드합니다.
3.  다운로드한 파일을 설치합니다.
    ```bash
    sudo dpkg -i <다운받은_파일이름.deb>
    ```

    > **Note:** 설치 중 의존성 오류가 발생하면 `sudo apt --fix-broken install`을 실행 후 다시 설치하세요.

-----

## 3\. JetPack 다운로드 및 패치

X221D 보드는 일반적인 방법으로 설치가 불가능하므로 **JetPack 5.1.2** 특정 버전이 필요합니다.

### 3.1 SDK Manager 실행 및 다운로드

1.  아카이브 버전을 활성화하여 SDK Manager를 실행합니다.
    ```bash
    sdkmanager --archivedversions
    ```


2.  설정 화면에서 다음과 같이 선택합니다 (기기 인식이 안되는 것은 정상입니다.)(img 1):
      * **Target Hardware**: Jetson AGX Xavier modules
      * **JetPack Version**: 5.1.2

    {% include project-media.html
        type="image"
        src="sdk_1.png"
        caption="img 1"
        size="medium"    
    %}

3.  설치 과정에서 **Flash는 건너뛰고(Skip)**, 필요한 파일만 다운로드(Download only)한 뒤 종료합니다(img 2).
    
    {% include project-media.html
        type="image"
        src="sdk_2.png"
        caption="img 2"
        size="medium"    
    %}

### 3.2 X221D 전용 펌웨어 패치


1. WSL 경로(`~/nvidia/nvidia_sdk/JetPack_5.1.2...`)에 폴더가 생성되었는지 확인합니다.(img 3)

    {% include project-media.html
        type="image"
        src="sdk_3.png"
        caption="img 3"
        size="medium"    
    %}

2. [Auvidea 펌웨어 사이트](https://auvidea.eu/firmware/) 에서 **X220, X221, X400용 펌웨어 (JetPack 5.1.2용)**를 다운로드합니다.(img 4)

    {% include project-media.html
        type="image"
        src="sdk_4.png"
        caption="img 4"
        size="medium"    
    %}

3. 다운로드한 파일의 압축을 `kernel_out` 폴더가 나올 때까지 반복 해제합니다.

4. `kernel_out` 내부의 파일들을 `Linux_for_Tegra` 폴더로 복사(덮어쓰기) 합니다.(img 5)
    * 대상 경로 예시: `~/nvidia/nvidia_sdk/JetPack_5.1.2_Linux_JETSON_AGX_XAVIER_TARGETS/Linux_for_Tegra`

    {% include project-media.html
        type="image"
        src="sdk_5.png"
        caption="img 5"
        size="medium"    
    %}

### 3.3 바이너리 적용

`Linux_for_Tegra` 디렉토리로 이동하여 바이너리를 적용합니다.

```bash
cd ~/nvidia/nvidia_sdk/JetPack_5.1.2_Linux_JETSON_AGX_XAVIER_TARGETS/Linux_for_Tegra
sudo ./apply_binaries.sh
```


-----

## 4\. Jetson Flash (OS 설치)

WSL에서 USB 장치를 인식시킨 후 Flash를 진행합니다.

### 4.1 USBIPD 설정 (Windows -\> WSL 연결)

1.  Windows에서 [usbipd-win](https://github.com/dorssel/usbipd-win/releases) (x64.msi)를 설치합니다.
2.  Jetson을 리커버리 모드(또는 전원 ON 상태)로 연결합니다.
3.  \*\*Windows PowerShell(관리자 권한)\*\*을 열고 다음을 실행합니다.
    ```powershell
    usbipd list
    ```

4.  목록에서 `APX` 장치의 BUSID(예: 5-2)를 확인합니다.
5.  장치를 바인딩하고 WSL로 연결합니다.
    ```powershell
    usbipd bind -b <BUSID>
    usbipd attach --wsl --busid <BUSID> --auto-attach
    ```

6.  WSL 터미널에서 `lsusb` 등으로 장치가 인식되었는지 확인합니다.

{% include project-media.html
    type="image"
    src="usbipd_1.png"
    caption="usbipd 참조 사진"
    size="medium"    
%}

### 4.2 Flash 명령어 실행

WSL의 `Linux_for_Tegra` 경로에서 다음 명령어를 실행하여 보드를 Flash 합니다.

```bash
sudo FLASH_PYTHON_BIN=/usr/bin/python3 ./flash.sh -r auvidea-agx-xavier-base mmcblk0p1
```



>**Tip:** 오류 발생 시 USBIPD 연결 상태를 다시 확인하세요.

-----

## 5\. 설치 후 설정

Flash가 성공적으로 완료되고 Jetson이 부팅되면 추가 설정을 진행합니다.

1.  **나머지 JetPack 요소 설치**: Jetson 터미널에서 인터넷 연결 후 실행합니다.
    ```bash
    sudo apt-get update && sudo apt-get install nvidia-jetpack
    ```

2.  **Python pip 설치**:
    ```bash
    sudo apt-get install python3-pip
    ```

3.  **VRAM 확인**:
    ```bash
    sudo tegrastats
    ```
