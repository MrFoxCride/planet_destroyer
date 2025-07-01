export class SaveManager {
  static save(state) {
    try {
      localStorage.setItem('pd_save', JSON.stringify(state));
    } catch (e) {
      // ignore quota errors
    }
  }

  static load() {
    try {
      const raw = localStorage.getItem('pd_save');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }
}

