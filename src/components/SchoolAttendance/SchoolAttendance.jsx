import React, { useState, useEffect } from 'react';
import { Calendar, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAthletes } from '../../context/AthleteContext';
import './SchoolAttendance.css';

const SchoolAttendance = () => {
  const { athletes } = useAthletes();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSchool, setSelectedSchool] = useState('');
  const [attendance, setAttendance] = useState({});

  const schools = [
    'Turno Manhã - Escola São Francisco',
    'Turno Manhã - Escola Estadual Padre Léo',
    'Turno Noite - Escola Estadual de Educação Básica Gentil Viegas Cardoso',
    'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza',
    'Turno Noite - E.M.E.F. Professor Juliano Nascimento'
  ];

  const attendanceOptions = [
    { value: '', label: '-', color: '#f8f9fa' },
    { value: 'P', label: 'P', color: '#28a745' },
    { value: 'F', label: 'F', color: '#dc3545' },
    { value: 'J', label: 'J', color: '#007bff' },
    { value: 'A', label: 'A', color: '#ffc107' },
    { value: 'L', label: 'L', color: '#6c757d' }
  ];

  // Obter atletas da escola selecionada ordenados alfabeticamente
  const getSchoolAthletes = () => {
    if (!selectedSchool) return [];
    
    const schoolAthletes = athletes[selectedSchool] || [];
    return schoolAthletes.sort((a, b) => {
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
  };

  // Gerar dias do mês atual
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  // Navegar entre meses
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Salvar presença no localStorage
  const saveAttendance = (athleteId, day, value) => {
    const key = `${selectedSchool}-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    const attendanceData = JSON.parse(localStorage.getItem('school-attendance') || '{}');
    
    if (!attendanceData[key]) {
      attendanceData[key] = {};
    }
    
    if (!attendanceData[key][athleteId]) {
      attendanceData[key][athleteId] = {};
    }
    
    attendanceData[key][athleteId][day] = value;
    localStorage.setItem('school-attendance', JSON.stringify(attendanceData));
    
    setAttendance(prev => ({
      ...prev,
      [`${athleteId}-${day}`]: value
    }));
  };

  // Carregar dados de presença
  useEffect(() => {
    const key = `${selectedSchool}-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    const attendanceData = JSON.parse(localStorage.getItem('school-attendance') || '{}');
    
    if (attendanceData[key]) {
      const flattenedData = {};
      Object.keys(attendanceData[key]).forEach(athleteId => {
        Object.keys(attendanceData[key][athleteId]).forEach(day => {
          flattenedData[`${athleteId}-${day}`] = attendanceData[key][athleteId][day];
        });
      });
      setAttendance(flattenedData);
    } else {
      setAttendance({});
    }
  }, [selectedSchool, currentDate]);

  // Gerar PDF da chamada
  const generatePDF = () => {
    if (!selectedSchool) {
      alert('Selecione uma escola primeiro!');
      return;
    }
    
    const schoolAthletes = getSchoolAthletes();
    const calendarDays = generateCalendarDays();
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    // Criar conteúdo HTML para o PDF
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Chamada Escolar - ${selectedSchool}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .school-name { color: #E30613; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          .month-year { font-size: 16px; margin-bottom: 20px; }
          .legend { margin-bottom: 20px; }
          .legend-item { display: inline-block; margin-right: 15px; }
          .legend-color { display: inline-block; width: 20px; height: 20px; margin-right: 5px; vertical-align: middle; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { border: 1px solid #000; padding: 4px; text-align: center; }
          th { background-color: #E30613; color: white; font-weight: bold; }
          .athlete-name { text-align: left; font-weight: bold; background-color: #f0f0f0; }
          .attendance-P { background-color: #28a745; color: white; }
          .attendance-F { background-color: #dc3545; color: white; }
          .attendance-J { background-color: #007bff; color: white; }
          .attendance-A { background-color: #ffc107; color: black; }
          .attendance-L { background-color: #6c757d; color: white; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="school-name">${selectedSchool}</div>
          <div class="month-year">Chamada Escolar - ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</div>
        </div>
        
        <div class="legend">
          <strong>Legenda:</strong>
          <div class="legend-item"><span class="legend-color" style="background-color: #28a745;"></span>P - Presença</div>
          <div class="legend-item"><span class="legend-color" style="background-color: #dc3545;"></span>F - Falta</div>
          <div class="legend-item"><span class="legend-color" style="background-color: #007bff;"></span>J - Jogo</div>
          <div class="legend-item"><span class="legend-color" style="background-color: #ffc107;"></span>A - Atestado</div>
          <div class="legend-item"><span class="legend-color" style="background-color: #6c757d;"></span>L - Liberado</div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th style="width: 200px;">Atleta</th>
              ${calendarDays.map(day => `<th>${day}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${schoolAthletes.map(athlete => `
              <tr>
                <td class="athlete-name">${athlete.name}</td>
                ${calendarDays.map(day => {
                  const attendanceValue = attendance[`${athlete.id}-${day}`] || '';
                  const className = attendanceValue ? `attendance-${attendanceValue}` : '';
                  return `<td class="${className}">${attendanceValue || '-'}</td>`;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    // Criar e baixar o PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const schoolAthletes = getSchoolAthletes();
  const calendarDays = generateCalendarDays();

  return (
    <div className="school-attendance">
      <div className="attendance-header">
        <div className="header-left">
          <Calendar size={32} />
          <div>
            <h1>Chamada Escolar</h1>
            <p>Controle de presença mensal</p>
          </div>
        </div>
        
        <div className="header-controls">
          <select 
            value={selectedSchool} 
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="school-selector"
          >
            <option value="">Selecione uma escola</option>
            {schools.map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>
          
          <button onClick={generatePDF} className="pdf-button" disabled={!selectedSchool}>
            <Download size={16} />
            ChamadaPdf
          </button>
        </div>
      </div>

      {selectedSchool && (
        <>
          <div className="calendar-navigation">
            <button onClick={() => navigateMonth(-1)} className="nav-button">
              <ChevronLeft size={20} />
            </button>
            <h2 className="current-month">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={() => navigateMonth(1)} className="nav-button">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="attendance-legend">
            <span>Legenda:</span>
            {attendanceOptions.slice(1).map(option => (
              <div key={option.value} className="legend-item">
                <span 
                  className="legend-color" 
                  style={{ backgroundColor: option.color }}
                >
                  {option.label}
                </span>
                <span className="legend-text">
                  {option.value === 'P' && 'Presença'}
                  {option.value === 'F' && 'Falta'}
                  {option.value === 'J' && 'Jogo'}
                  {option.value === 'A' && 'Atestado'}
                  {option.value === 'L' && 'Liberado'}
                </span>
              </div>
            ))}
          </div>

          {schoolAthletes.length > 0 ? (
            <div className="attendance-table-container">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th className="athlete-column">Atleta</th>
                    {calendarDays.map(day => (
                      <th key={day} className="day-column">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schoolAthletes.map(athlete => (
                    <tr key={athlete.id}>
                      <td className="athlete-name">{athlete.name}</td>
                      {calendarDays.map(day => (
                        <td key={day} className="attendance-cell">
                          <select
                            value={attendance[`${athlete.id}-${day}`] || ''}
                            onChange={(e) => saveAttendance(athlete.id, day, e.target.value)}
                            className="attendance-select"
                            style={{
                              backgroundColor: attendanceOptions.find(
                                opt => opt.value === (attendance[`${athlete.id}-${day}`] || '')
                              )?.color || '#f8f9fa'
                            }}
                          >
                            {attendanceOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-athletes">
              <p>Nenhum atleta cadastrado nesta escola.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SchoolAttendance;

