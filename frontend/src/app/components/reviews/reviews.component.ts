import {Component, Input} from '@angular/core';
import {Review} from "../../models/review";
import {ReviewsService} from "../../services/reviews/reviews.service";
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  public reviews: Review[];
  @Input() movieId: number | undefined;
  reviewForm!: FormGroup;
  private reviewsService: ReviewsService;
  private userService: UserService;
  private readonly user: Observable<User>;
  public activeUser: User | undefined;
  public userReview: User | undefined;

  constructor(reviewsService: ReviewsService, userService: UserService, private _form_builder: FormBuilder) {
    this.reviewsService = reviewsService;
    this.userService = userService;
    this.user = this.userService.getUser();
    this.reviews = [];
  }

  ngOnInit() {
    this.user.subscribe((user: User) => {
      this.activeUser = user;
      this.reviewForm = this._form_builder.group({
        user: user.id,
        movie: this.movieId,
        review: ['', Validators.required],
        rating: ['', Validators.required]
      })
    });
    this.reviewsService.getReviews(this.movieId).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
  }

  onSubmit() {
    this.reviewsService.createReview(this.reviewForm.value).subscribe((data: any) => {
      window.location.reload();
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteReview(reviewId: number) {
    this.reviewsService.deleteReview(reviewId).subscribe((data: any) => {
      window.location.reload();
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // get the name of the user who wrote the review
  getUser(userId: number) : string {
    this.userService.getUserById(userId).subscribe((user: User) => {
      this.userReview = user;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      }
      );
    return this.userReview?.first_name + ' ' + this.userReview?.last_name;
  }
}
