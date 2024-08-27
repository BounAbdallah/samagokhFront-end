import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [DatePipe]
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getRecentNotifications().subscribe(
      (data: any[]) => {
        this.notifications = data; // Données formatées par le service
        console.log('Notifications:', this.notifications);
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    );
  }
}
