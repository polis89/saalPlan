import * as _ from 'lodash';
import * as d3 from 'd3';
import { sections } from './sections';

export default class SaalPlan {
    constructor(options) {
        console.log('options');
        console.dir(options);
        this.options = options;
        this.container = d3.select(this.options.container);
        this.container
            .select('svg')
            .style('width', this.options.dimensions[0] + 'px')
            .style('height', this.options.dimensions[1] + 'px')

        const updateSection = this.updateSectionView.bind(this);

        this.initSectionView();
        this.seats = [];

        this.container
            .selectAll('.hallSection')
            .style('cursor', 'pointer')
            .on('click', function() {
                updateSection(d3.select(this).attr('sectionid'));
            })
    };

    initSectionView() {
        this.sectionViewContainer = this
            .container
            .append('div')
            .attr('class', 'sectionsView')
            .style('width', this.options.dimensions[0] + 'px')
            .style('height', this.options.dimensions[1] + 'px')
            .style('background', '#fff')

        this.sectionViewContainer
            .append('div')
            .attr('class', 'sectionTitle')
            .text('Section: ')

        this.sectionViewContainer
            .append('div')
            .attr('class', 'selectedSeats')
            .append('div')
            .text('Selected Seats: ')
    }

    updateSectionView(sectionId) {
        const place_size = 20;
        this.sectionViewContainer.select('.sectionTitle').text('Section: ' + sectionId)
        this.sectionViewContainer.selectAll('svg').remove();
        let sectionsSvg = this.sectionViewContainer.append('svg');
        const section = sections[sectionId];
        console.log('section: ');
        console.dir(section);

        const addSeat = this.addSeat.bind(this)
        
        sectionsSvg
            .selectAll('g.row')
            .data(section.rows)
            .enter()
            .append('g')
            .attr('class', 'row')
            .each(function(d, row_i) {
                console.dir(d);
                
                d3.select(this)
                    .selectAll('.place')
                    .data(d.places)
                    .enter()
                    .append('rect')
                    .attr('class', 'place')
                    .attr('x', (d, place_i) => place_size * place_i)
                    .attr('y', () => place_size * row_i)
                    .attr('rx', 5)
                    .attr('ry', 5)
                    .attr('width', place_size - 4)
                    .attr('height', place_size - 4)
                    .attr('fill', '#eee')
                    .style('cursor', d => d ? 'pointer' : 'default')
                    .style('opacity', d => d ? 1 : 0)
                    .on('click', function(seat_data) {
                        if (seat_data){
                            d3.select(this).attr('fill', 'green')
                            addSeat(sectionId, seat_data)
                        }
                    })
            })
    }
    
    addSeat(sectionId, seat_data) {
        this.seats.push({
            id: seat_data.place_id,
            section: sectionId,
            row: seat_data.place_row,
            place: seat_data.place_num
        })
        this.updateSeats()
    }

    updateSeats() {
        let seatsData = this.sectionViewContainer
            .select('.selectedSeats')
            .selectAll('.selectedSeat')
            .data(this.seats, d => d.id)

        seatsData
            .enter()
            .append('div')
            .attr('class', 'selectedSeat')
            .text(d => JSON.stringify(d))
        seatsData.exit().remove()
    }
}