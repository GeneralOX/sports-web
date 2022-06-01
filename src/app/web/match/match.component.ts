import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  dataImg = [
    "data:image/webp;base64,UklGRgIEAABXRUJQVlA4IPYDAADQFwCdASoyAB4APmkqkUWkIqGYBgBABoS2AE6ZQj8b2bzJ6k/hPurt7JFOun8l9pPu4/wHsA/AHoPdIDzAfyX+q/uB7138d/VX3AegB/ZP9H1gHoV/qr6VP7M/CR+03pDf/+8LPjvROeZ/XXKRPefBJ27n4gcKnwf+Xf3D8ubolMd/7H+A/Cv3E/Of/Y9wv9Uf8p1+vR0G/mkTraFO8/WYvyu8JF67A3W/szq2GYZVzzxdG//l2fDNBvK8/Xko9xyPkLpGAmQgAP75oVjy+C8UTs+FELxiECthSM78u6lHT4VrnDbr/3x/KCRnn9ZPzLs1gr0b0UtAQ5oOeM0uoKUZf+iXv63jZMang8o1HJ2Dwt8g6efeeJWEfE7GWTmY9m0voF37xq3fxTQb8mbucWUUIce/Q4olzuTcDgWfJhtyoKL9LY9wz+F1urL9OdhlwD/83H/OiASHcHiu/+qZPD6M7cgYECfPljR7x0j2dRlm2tlVNbGkxcnZG+FSs5n/1VdBj9ZpI3mm9qo7LeBBmIqbj2GcpMGfIb//h5HTHgRCvphHdEBOgKk1vTAq3/Dzt+EdQDkIGcXFeWWICZg0a5fso8BdeyfhttX8FfGPEljfV4UrAWxAitmyttAarc6aFhyiU4j3QahN/mSFsY9Fd53S3G4UXGM1EXyAklj7fnAMY+B5hAci7jvFnU6xuJIA99JZz8qqevInzn9z5vI8NEUMUEPEv1RHkVbJt6ddtc5pSlunlCwZU/jRTuKF7POk0jiwTwxHp0K8sfgArsflFyq3nVlpkol0n8ZxWt8qmieblU1Pxe+ByP/F7I4UAB9CvcL/Oe+W7y7hDidVKpI8rexbq1fd94giSVYFHGB05pMFpCOkcyq3EfXN+7qPUoenV8y+s6xo38Rjtj0QmTKRZ7dwTTBVeJLsvajVdaZ8AHyXYcUa/GyNFHZ+P3HUv+3hdqxumQz++ChAgWYQcPXfLRnOPceX/FgGssDLJaM6sVGqX7d7M7nGpmOD8jfMD+igYsrT3XQHnHjcJwv/sipMLrfpyR/f+/bg7t56Bf6gydcf5//0RtGgTavF1RwQVBwpC17rydP73J8UR3HvoKJH/pYq1gUL8Zl/iPMm2qaDuMx2EnPDcYeIH4EQrQkqqEou8jvEOHVHzVcVdIWYs7zz/Z+TV6Gh0ojPKJe2tQYo0v7i2leBvTbwZeD44j9zH3no0z3MVkXT7OQBxYFlkyVCSEndHHNBSGLjJ5y4Vu3XpRD6XbiTKUlSfS9Hinf/jmdxK2flKZuWAZj/JxL3bmun65rzFsYg9S5mXAj0hSCD5nKEEsKKLjlmlWO1KYQbSnlVy1+/irCgAAA=",
    "data:image/webp;base64,UklGRtABAABXRUJQVlA4IMQBAACQCQCdASoyAB4APm00mEgkIqKhJAkggA2JaAB5A/ZmVoZAB5Q9JNnsLwAqAH3AT2b+0fcl7SvjP/J+p/vs37HA0kS9irIYjzzhWWnyIIYKtaO3p07kAP7jwjlJNV6/2X8d2PNfKtZXEXp8QntoQ9ya3ZjntsRDgEDIDLtWVVYTHaw3K69Xh8/cDFt2ZPzLlJRdFGbsfjSppuGYSNYU5CW6N1VseDIWm75QQ62UxIgFj2hrPQ5FA6y5VfBrAm597fHEz6Ic3gnBFu2N+7aLS6t/+KIBRYdl6HsQvtW/6THQr2tQzMJ3LXm4PsA5k+ms2my1jkgQXQX38zn+DWYUXrFlBKBX4TN1XkvvpPxvnfNyWd3TkHPGJLXp3BQ+jv+z6B4OZbL/P1t3GJmwGovOhw4DnLniOFO5nmq+p8LBpjfsod+m2e6twQTNO29PtcqvuIndW1K/1s2UotHI4vNNmlzfOPTbSfmAH7gJl2H2w4eNhq7VgGJkHFtxYm//s9mOhrU3882+zAM5YXvtu/rblyOW2fwD9H6vmP8RX5KTHZdQ8FKoFoE6UGwZvIX7hzzB95C/cOd7p9KE/A4Oz23UrlB7I0AAAA=="
  ];
  isView1 = true;
  league = {};
  teams: any[] = [];
  matches: any[] = [];

  constructor(private webSerivce: WebService, private route: ActivatedRoute) { }

  ngOnInit() {
    let leagueId = this.route.snapshot.paramMap.get('id');

    if (leagueId == null) {
      // Get All the matches
      this.webSerivce.getAllMatches().subscribe(
        (r) => {
          this.matches = r;
        })
    }
    else {
      // Get league matches
      this.webSerivce.getLeagueMatches(leagueId)
        .subscribe(
          (r) => {
            this.matches = r;
          })
    }
  }
  clearDate(e: string) {
    return e.split("T")[0];
  }
}
