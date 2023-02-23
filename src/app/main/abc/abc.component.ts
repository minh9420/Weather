import { Component, ElementRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AuthService } from 'src/app/auth.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
@Component({
  selector: 'angular-abc',
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.scss']
})
export class AbcComponent {
  @ViewChild("btn1", {
    static: false
  }) btn1: ElementRef;
  @ViewChild("btn2", {
    static: false
  }) btn2: ElementRef;
  @ViewChild("btn3", {
    static: false
  }) btn3: ElementRef;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  @ViewChild("corporation", { read: ElementRef }) corporation: ElementRef;
  tinhThanh: any[]
  title = 'My first AGM project';
  lat = 21.0245;
  lng = 105.8412;
  mapType = "normal"
  googleMapType = 'satellite';
  markerlat = 21.0245;
  markerlng = 105.8412;
  zoom = 10
  ngay: string = "";
  label: string
  nameTinhThanh: string
  temp5day: any[] = []
  tempbtn: boolean = true;
  rainbtn: boolean = false
  windbtn: boolean = false
  widthOld: number
  newBtn: any
  newbtn1: any
  newbtn2: any
  newbtn3: any
  constructor(private authService: AuthService) {
    this.getTinhThanh()
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [
          ]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "right"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
        ]
      }
    };

  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.getCallApiMap({ q: 'Ha Noi' })
    this.newBtn = (document.querySelector('.child-btn') as HTMLElement);
    this.newBtn.style.width = `${64}px`
    console.log('ưhy')
  }
  ngAfterViewChecked() {
    this.newbtn1 = this.btn1.nativeElement.offsetWidth
    this.newbtn2 = this.btn2.nativeElement.offsetWidth
    this.newbtn3 = this.btn3.nativeElement.offsetWidth
  }
  isLogined(): boolean {
    return this.authService.isLogin();
  }
  async getCallApiMap(data: any) {
    this.authService.getApiMap(data).subscribe(async (data: any) => {
      this.temp5day = []
      this.ngay = "";
      this.lat = data.city.coord['lat']
      this.lng = data.city.coord['lon']
      this.markerlat = data.city.coord['lat']
      this.markerlng = data.city.coord['lon']
      data.list.forEach((element: any) => {
        let ngayData = element['dt_txt'].slice(0, 11).trim()
        if (ngayData !== this.ngay) {
          this.ngay = ngayData
          this.temp5day.push(element)
        }
      });
      const ngayNew = await this.getChart(this.temp5day).map((element: any) => {
        return element.replaceAll("2023-", "")
      })
      const tempNew = await this.getTemp(this.temp5day)
      const rainNew = await this.getRain(this.temp5day)
      const windNew = await this.getWind(this.temp5day)
      this.chartOptions.xaxis = {
        categories: ngayNew
      }
      this.chartOptions.series = [{
        data: tempNew
      }];

    })
  }
  getChart(data: any) {
    const ngayNew = data.map((element: any) => {
      return element['dt_txt'].slice(0, 11).trim()
    })
    return ngayNew
  }
  getTemp(data: any) {
    const tempNew = data.map((element: any) => {
      let newTemp = element.main['temp'] - 273.15
      return parseInt(newTemp.toFixed(0));
    })
    return tempNew
  }
  getRain(data: any) {
    const tempRain = data.map((element: any) => {
      let Rain = element.pop
      return `${(Rain.toFixed(0)) * 100}%`
    })
    return tempRain
  }
  getWind(data: any) {
    const tempWind = data.map((element: any) => {
      let Wind = element.wind.speed
      return `${Wind.toFixed(2)} km/h`
    })
    return tempWind
  }
  async getTinhThanh() {
    this.tinhThanh = []
    this.authService.getTinhThanh().subscribe(data => {
      // console.log('tinh', data)
      this.tinhThanh = data
    })
  }
  getDay(item: any) {
    let b = new Date(item.dt_txt)
    let c = b.getDay()
    let day;
    switch (c) {
      case 0:
        day = 'CN'
        break;
      case 1:
        day = 'Thứ 2'
        break;
      case 2:
        day = 'Thứ 3'
        break;
      case 3:
        day = 'Thứ 4'
        break;
      case 4:
        day = 'Thứ 5'
        break;
      case 5:
        day = 'Thứ 6'
        break;
      case 6:
        day = 'Thứ 7'
        break;
    }
    return day
  }
  getChange(item: any) {
    // console.log('item', item.target)
  }
  timKiem(event: any) {
    // console.log('form', this.corporation.nativeElement)
    const corporationObj = this.corporation.nativeElement.value;
    let newText = this.removeAccents(corporationObj)
    this.label = newText
    let data = {
      q: newText
    };
    this.getCallApiMap(data)
  }
  removeAccents(str: any) {
    let newText;
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
      newText = str.replace("Thanh pho ", "")
    }
    return newText;
  }
  changeBtn(event: any, num: number) {
    // let button2 = this.btn2.nativeElement.offsetWidth
    if (!this.temp5day.length) {
      return
    }
    if (num === 1) {
      console.log('1', this.newBtn)

      this.newBtn.style.width = `${this.newbtn1}px`;
      this.newBtn.style.left = `0px`
      this.chartOptions.series = [{
        data: this.getTemp(this.temp5day)
      }];
      return
    } else if (num === 2) {
      // console.log('2', button2)
      console.log('2', this.newBtn)
      this.newBtn.style.left = `${this.newbtn1 + 8}px`
      this.newBtn.style.width = `${this.newbtn2}px`;
      this.chartOptions.series = [{
        data: this.getRain(this.temp5day)
      }];
    } else {
      console.log('3', this.newbtn3)

      this.newBtn.style.width = `${this.newbtn3}px`;
      this.newBtn.style.left = `${this.newbtn1 + this.newbtn2 + 15}px`
      this.chartOptions.series = [{
        data: this.getWind(this.temp5day)
      }];
    }
    console.log('ra', this.newBtn, this.newbtn1, this.newbtn2, this.newbtn3)
  }
}
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};