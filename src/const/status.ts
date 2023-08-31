export const invoiceStatus = [
  {status: 'all', label: 'Semua'},
  {status: 'paid', label: 'Dibayar'},
  {status: 'checkout', label: 'Menunggu Pembayaran'},
  {status: 'processed', label: 'Diproses'},
  {status: 'shipped', label: 'Dikirim'},
  {status: 'delivered', label: 'Sudah Diterima'},
  {status: 'finished', label: 'Selesai'},
  {status: 'canceled', label: 'Batal'},
  {status: 'expired', label: 'Dibatalkan Otomatis (Kedaluwarsa)'}
]

export const invoiceStatusColor = (status: string) => {
  switch (status) {
      case 'paid':
          return 'primary';
      case 'checkout':
          return 'warning';
      case 'processed':
          return 'info';
      case 'shipped':
          return 'info';
      case 'delivered':
          return 'info';
      case 'finished':
          return 'success';
      case 'canceled':
          return 'error';
      case 'expired':
        return 'error';
      default:
          return 'default';
  }
}