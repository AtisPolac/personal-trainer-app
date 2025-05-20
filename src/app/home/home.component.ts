import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stats = [
    { value: 2, label: 'Treinadores Certificados' },
    { value: 10, label: 'Anos de Experiência' },
    { value: 105, label: 'Clientes Satisfeitos' }
  ];
  isStatsVisible = false;
  currentValues = [0, 0, 0];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      const rect = statsSection.getBoundingClientRect();
      this.isStatsVisible = rect.top >= 0 && rect.top < window.innerHeight;
      if (this.isStatsVisible && this.currentValues[0] < this.stats[0].value) {
        this.animateCounters();
      }
    }
  }

  ngOnInit(): void {}

  animateCounters() {
    const duration = 2000; // Duração da animação em milissegundos (2 segundos)
    const startTime = performance.now();

    const updateCounters = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      this.currentValues = this.stats.map((stat, index) => 
        Math.floor(progress * stat.value)
      );

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      } else {
        this.currentValues = this.stats.map(stat => stat.value);
      }
    };

    requestAnimationFrame(updateCounters);
  }
}