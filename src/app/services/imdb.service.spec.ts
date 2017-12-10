// import { TestBed, inject, async } from '@angular/core/testing';
// import {
//     HttpModule,
//     Http,
//     Response,
//     ResponseOptions,
//     XHRBackend
// } from '@angular/http';
// import { MockBackend, MockConnection } from '@angular/http/testing';

// import { ImdbService } from './imdb.service';
// import { environment } from '../../environments/environment';

// describe('ImdbService', () => {

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [HttpModule],
//             providers: [
//                 ImdbService,
//                 { provide: XHRBackend, useClass: MockBackend }
//             ]
//         });

//         TestBed.get('XHRBackend')
//     });

//     it('should be created',
//         inject([ImdbService], (service: ImdbService) => {
//             expect(service).toBeTruthy();
//         })
//     );

//     describe('searchMovies()', () => {
//         it('should return an observable.',
//             inject([ImdbService, XHRBackend], (imdbService: ImdbService, mockBackend: MockBackend) => {
                
//                 const mockResponse = new ResponseOptions({
//                     body: JSON.stringify({
//                         data: [
//                             { id: 0, name: 'Video 0' },
//                             { id: 1, name: 'Video 1' },
//                             { id: 2, name: 'Video 2' },
//                             { id: 3, name: 'Video 3' },
//                         ]
//                     })
//                 });

//                 mockBackend.connections.subscribe((connection: MockConnection) => {
//                     this.lastConnection = connection;
//                     connection.mockRespond(new Response(mockResponse));
//                 });

//                 imdbService.searchMovies('someTitle').subscribe( movies => {
//                     console.log(movies);
//                     console.log(this.lastConnection);
//                     expect(movies).toBeDefined('movies was not defined');
//                 })
//             })
//         );
//     })
// });
